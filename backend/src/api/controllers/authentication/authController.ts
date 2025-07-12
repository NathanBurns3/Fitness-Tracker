import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';
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
import { calculateMacros } from '../../helpers/macroCalculation';
import axios from 'axios';

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      userSettings,
      password,
      captchaToken,
    }: { userSettings: IUserSettings; password: string; captchaToken: string } =
      req.body;
    if (!userSettings || !password || !captchaToken) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const response = await axios.post(verifyUrl);
    if (!response.data.success || response.data.score < 0.5) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    const existingUser = await User.findOne({
      email: userSettings.contactInformation.email,
    });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      password: hashedPassword,
      firstName: userSettings.personalInformation.firstName,
      lastName: userSettings.personalInformation.lastName,
      email: userSettings.contactInformation.email,
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const decodedEmail = Buffer.from(email, 'base64').toString('utf-8');
    const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');

    const user = await User.findOne({ email: decodedEmail });
    if (!user || !(await bcrypt.compare(decodedPassword, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

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
