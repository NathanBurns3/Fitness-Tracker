import mongoose, { Types } from 'mongoose';
import { Request, Response } from 'express';
import YearlyInfo from '../../models/db/yearlyInfo';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getYearlyEatingGoals = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    const userYearlyInfo = await YearlyInfo.findOne({
      userID: new Types.ObjectId(userID),
    }).lean();

    if (!userYearlyInfo) {
      return res
        .status(404)
        .json({ message: 'Yearly Info not found for this user' });
    }

    const yearlyEatingGoals = userYearlyInfo.month.map(
      (month) => month.eatingGoalsCompleted
    );
    res.status(200).json({ yearlyEatingGoals });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Server Error',
    });
  }
};

export const getYearlyExerciseGoals = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const userYearlyInfo = await YearlyInfo.findOne({ userID: userID }).lean();

    if (!userYearlyInfo) {
      return res
        .status(404)
        .json({ message: 'Yearly Info not found for this user' });
    }

    const yearlyExerciseGoals = userYearlyInfo.month.map(
      (month) => month.exerciseGoalsCompleted
    );
    res.status(200).json({ yearlyExerciseGoals });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Server Error',
    });
  }
};
