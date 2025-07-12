import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../../models/db/user';
import Goals from '../../models/db/goals';
import CustomMeals from '../../models/db/customMeals';
import DailyInfo from '../../models/db/dailyInfo';
import Exercises from '../../models/db/exercises';
import FavoriteFoods from '../../models/db/favoriteFoods';
import MonthlyInfo from '../../models/db/monthlyInfo';
import YearlyInfo from '../../models/db/yearlyInfo';
import { IUserSettings } from '../../models/api/settings/user-settings';
import { GenderEnum } from '../../models/api/settings/gender-enum';
import { ActivityLevelEnum } from '../../models/api/settings/activity-level-enum';
import { WeightGoalEnum } from '../../models/api/settings/weight-goal-enum';
import { DietEnum } from '../../models/api/settings/diet-enum';
import { IPersonalInformation } from '../../models/api/settings/personal-information';
import { IContactInformation } from '../../models/api/settings/contact-information';
import { IPhysicalMeasurements } from '../../models/api/settings/physical-measurements';
import { IActivityGoal } from '../../models/api/settings/activity-goals';
import { calculateMacros } from '../../helpers/macroCalculation';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';
import validator from 'validator';

export const getUserSettings = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const userSettings = await User.findOne({ _id: userID });
    if (!userSettings) {
      return res.status(404).json({ message: 'User settings not found.' });
    }

    const personalInformation: IPersonalInformation = {
      firstName: userSettings.firstName,
      lastName: userSettings.lastName,
      gender: userSettings.gender as GenderEnum,
      age: userSettings.age,
      profilePicture: userSettings.profileImage || '',
    };

    const contactInformation: IContactInformation = {
      email: userSettings.email,
      phoneNumber: userSettings.phone || '',
    };

    const physicalMeasurements: IPhysicalMeasurements = {
      height: userSettings.height,
      weight: userSettings.weight,
    };

    const activityGoal: IActivityGoal = {
      Activity: userSettings.activityLevel as ActivityLevelEnum,
      WeightGoal: userSettings.weightGoal as WeightGoalEnum,
    };

    const settingsInfo: IUserSettings = {
      personalInformation,
      contactInformation,
      physicalMeasurements,
      activityGoal,
      dietPlan: userSettings.dietPlan as DietEnum,
    };

    return res.status(200).json(settingsInfo);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserSettings = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { settings }: { settings: IUserSettings } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    if (
      !settings ||
      !settings.personalInformation ||
      !settings.contactInformation ||
      !settings.physicalMeasurements ||
      !settings.activityGoal
    ) {
      return res
        .status(400)
        .json({ message: 'Invalid settings object.', success: false });
    }

    if (
      !validator.isEmail(settings.contactInformation.email) ||
      !validator.isMobilePhone(settings.contactInformation.phoneNumber)
    ) {
      return res.status(400).json({ message: 'Invalid email or phone number' });
    }

    const updatedSettings = await User.findOneAndUpdate(
      { _id: userID },
      {
        firstName: settings.personalInformation.firstName,
        lastName: settings.personalInformation.lastName,
        email: settings.contactInformation.email,
        phone: settings.contactInformation.phoneNumber,
        profileImage: settings.personalInformation.profilePicture,
        gender: settings.personalInformation.gender,
        age: settings.personalInformation.age,
        height: settings.physicalMeasurements.height,
        weight: settings.physicalMeasurements.weight,
        activityLevel: settings.activityGoal.Activity,
        weightGoal: settings.activityGoal.WeightGoal,
        dietPlan: settings.dietPlan,
      },
      { new: true }
    );
    if (!updatedSettings) {
      return res
        .status(404)
        .json({ message: 'User settings not found.', success: false });
    }

    const updatedMacros = await calculateUserMacros(userID, updatedSettings);

    return res
      .status(200)
      .json({ updatedSettings, updatedMacros, success: true });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const updatePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { newPassword } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
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

    const updatedSettings = await User.findOneAndUpdate(
      { _id: userID },
      {
        password: newPassword,
      },
      { new: true }
    );
    if (!updatedSettings) {
      return res
        .status(404)
        .json({ message: 'User settings not found.', success: false });
    }

    return res.status(200).json({ updatedSettings, success: true });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteAccount = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    const deletedUser = await User.findOneAndDelete({ _id: userID });
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: 'User not found.', success: false });
    }

    await Promise.all([
      CustomMeals.deleteMany({ userID }),
      DailyInfo.deleteMany({ userID }),
      Exercises.deleteMany({ userID }),
      FavoriteFoods.deleteMany({ userID }),
      Goals.deleteMany({ userID }),
      MonthlyInfo.deleteMany({ userID }),
      YearlyInfo.deleteMany({ userID }),
    ]);

    return res
      .status(200)
      .json({ message: 'Account deleted successfully.', success: true });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const calculateUserMacros = async (
  userID: string,
  updatedSettings: any
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      throw new Error('Invalid user ID.');
    }

    const age: number = updatedSettings.age;
    const gender: GenderEnum = updatedSettings.gender;
    const heightInCentimeters: number = updatedSettings.height * 2.54;
    const weightInKilograms: number = updatedSettings.weight * 0.453592;
    const activityLevel: ActivityLevelEnum = updatedSettings.activityLevel;
    const goal: WeightGoalEnum = updatedSettings.weightGoal;
    const diet: DietEnum = updatedSettings.dietPlan;

    const macros = calculateMacros(
      age,
      gender,
      heightInCentimeters,
      weightInKilograms,
      activityLevel,
      goal,
      diet
    );

    const updatedGoals = await Goals.findOneAndUpdate(
      { userID: userID },
      {
        foodGoals: {
          calories: macros.calories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          fiber: macros.fiber,
        },
      },
      { new: true }
    );

    if (!updatedGoals) {
      throw new Error('User goals not found.');
    }

    return updatedGoals.foodGoals;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};
