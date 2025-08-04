import { Request, Response } from 'express';
import {
  AuthenticatedRequest,
  blacklistToken,
} from '../../helpers/authMiddleware';
import { IUserSettings } from '../../models/api/settings/user-settings';
import bcrypt from 'bcrypt';
import User from '../../models/db/user';
import jwt from 'jsonwebtoken';
import CustomMeals from '../../models/db/customMeals';
import DailyInfo from '../../models/db/dailyInfo';
import Exercises from '../../models/db/exercises';
import FavoriteFoods from '../../models/db/favoriteFoods';
import Goals from '../../models/db/goals';
import MonthlyInfo from '../../models/db/monthlyInfo';
import YearlyInfo from '../../models/db/yearlyInfo';
import PendingEmail from '../../models/db/pendingEmail';
import { calculateMacros } from '../../helpers/macroCalculation';
import axios from 'axios';
import validator from 'validator';
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  generateToken,
} from '../../helpers/emailService';

export const signup = async (req: Request, res: Response) => {
  try {
    console.log('Signup request received:', JSON.stringify(req.body));
    const {
      userSettings,
      password,
      captchaToken,
    }: { userSettings: IUserSettings; password: string; captchaToken: string } =
      req.body;
    if (!userSettings || !password || !captchaToken) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    console.log('Validating email and phone...');
    if (
      !validator.isEmail(userSettings.contactInformation.email) ||
      !validator.isMobilePhone(userSettings.contactInformation.phoneNumber)
    ) {
      console.log('Validation failed for email or phone');
      return res.status(400).json({ message: 'Invalid email or phone number' });
    }

    console.log('Decoding and checking password...');
    const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');
    const passwordSafe =
      decodedPassword.length >= 8 &&
      /[A-Z]/.test(decodedPassword) &&
      /[a-z]/.test(decodedPassword) &&
      /\d/.test(decodedPassword) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(decodedPassword);

    if (!passwordSafe) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      });
    }

    console.log('Verifying CAPTCHA...');
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const response = await axios.post(verifyUrl);
    if (!response.data.success || response.data.score < 0.5) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    const email = userSettings.contactInformation.email;

    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    console.log('Checking for pending email...');
    const existingPending = await PendingEmail.findOne({ email });
    if (existingPending) {
      return res.status(409).json({
        message: 'Email already pending verification. Please check your inbox.',
      });
    }

    const verificationToken = generateToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const pendingEmail = new PendingEmail({
      email,
      verificationToken,
      verificationExpires,
      userSettings,
      password,
    });

    await pendingEmail.save();
    console.log('Pending email saved:', email);

    await sendVerificationEmail(email, verificationToken);
    console.log('Verification email sent to:', email);

    res.status(201).json({
      message:
        'Registration initiated. Please check your email to verify your account.',
    });
  } catch (error: Error | any) {
    console.error('Signup error:', error); // This will print the stack trace
    res.status(500).json({ message: error.message });
  }
};

const MAX_FAILED_ATTEMPTS = 3;
const WINDOW_MS = 15 * 60 * 1000;

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, captchaToken } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const decodedEmail = Buffer.from(email, 'base64').toString('utf-8');
    if (!validator.isEmail(decodedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');

    const user = await User.findOne({ email: decodedEmail });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const now = new Date();
    const attempts = user.failedLoginAttempts || {
      count: 0,
      lastAttempt: null,
    };
    if (
      attempts.count >= MAX_FAILED_ATTEMPTS &&
      attempts.lastAttempt &&
      now.getTime() - new Date(attempts.lastAttempt).getTime() < WINDOW_MS
    ) {
      if (!captchaToken) {
        return res.status(429).json({ message: 'CAPTCHA required' });
      }
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
      const captchaRes = await axios.post(verifyUrl);
      if (!captchaRes.data.success) {
        return res.status(400).json({ message: 'CAPTCHA verification failed' });
      }
    }

    if (!(await bcrypt.compare(decodedPassword, user.password))) {
      await User.updateOne(
        { _id: user._id },
        {
          $inc: { 'failedLoginAttempts.count': 1 },
          $set: { 'failedLoginAttempts.lastAttempt': now },
        }
      );

      if (attempts.count + 1 >= MAX_FAILED_ATTEMPTS) {
        return res.status(429).json({ message: 'CAPTCHA required' });
      }
      return res.status(401).send('Invalid credentials');
    }

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          'failedLoginAttempts.count': 0,
          'failedLoginAttempts.lastAttempt': null,
        },
      }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      blacklistToken(token);
    }
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const pendingEmail = await PendingEmail.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() },
    });

    if (!pendingEmail) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    res.status(200).json({
      message:
        'Email verified successfully. You can now complete your registration.',
      email: pendingEmail.email,
    });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const completeRegistration = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const pendingEmail = await PendingEmail.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() },
    });
    if (!pendingEmail) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const { email, userSettings, password } = pendingEmail;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');
    const hashedPassword = await bcrypt.hash(decodedPassword, 10);

    const newUser = new User({
      password: hashedPassword,
      firstName: userSettings.personalInformation.firstName,
      lastName: userSettings.personalInformation.lastName,
      email: email,
      phone: userSettings.contactInformation.phoneNumber,
      profileImage: userSettings.personalInformation.profilePicture,
      gender: userSettings.personalInformation.gender,
      age: userSettings.personalInformation.age,
      height: userSettings.physicalMeasurements.height,
      weight: userSettings.physicalMeasurements.weight,
      activityLevel: userSettings.activityGoal.Activity,
      weightGoal: userSettings.activityGoal.WeightGoal,
      dietPlan: userSettings.dietPlan,
    });

    await newUser.save();

    await PendingEmail.deleteOne({ _id: pendingEmail._id });

    const userId = newUser._id;

    const macros = calculateMacros(
      userSettings.personalInformation.age,
      userSettings.personalInformation.gender,
      userSettings.physicalMeasurements.height,
      userSettings.physicalMeasurements.weight,
      userSettings.activityGoal.Activity,
      userSettings.activityGoal.WeightGoal,
      userSettings.dietPlan
    );

    const blankCollections = [
      new CustomMeals({ userID: userId, meals: [] }),
      new DailyInfo({ userID: userId, exercisesCompleted: [], foods: [] }),
      new Exercises({ userID: userId, items: [] }),
      new FavoriteFoods({ userID: userId, foods: [] }),
      new Goals({
        userID: userId,
        exerciseStreak: 0,
        eatingGoalStreak: 0,
        foodGoals: {
          calories: macros.calories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          fiber: macros.fiber,
        },
      }),
      new MonthlyInfo({ userID: userId, sets: [], goalsCompleted: [] }),
      new YearlyInfo({ userID: userId, month: [] }),
    ];

    await Promise.all(blankCollections.map((collection) => collection.save()));

    res.status(201).json({ message: 'User created successfully' });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const decodedEmail = Buffer.from(email, 'base64').toString('utf-8');
    const user = await User.findOne({ email: decodedEmail });

    if (!user) {
      return res
        .status(200)
        .json({ message: 'If the email exists, a reset link has been sent.' });
    }

    const resetToken = generateToken();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    await sendPasswordResetEmail(decodedEmail, resetToken);

    res
      .status(200)
      .json({ message: 'If the email exists, a reset link has been sent.' });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: 'Token and new password are required' });
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const decodedPassword = Buffer.from(newPassword, 'base64').toString(
      'utf-8'
    );

    const passwordSafe =
      decodedPassword.length >= 8 &&
      /[A-Z]/.test(decodedPassword) &&
      /[a-z]/.test(decodedPassword) &&
      /\d/.test(decodedPassword) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(decodedPassword);

    if (!passwordSafe) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      });
    }

    const hashedPassword = await bcrypt.hash(decodedPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};
