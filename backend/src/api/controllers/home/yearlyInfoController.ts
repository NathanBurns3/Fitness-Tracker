import mongoose, { Types } from 'mongoose';
import { Request, Response } from 'express';
import YearlyInfo from '../../models/db/yearlyInfo';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

const formatYearlyData = (
  monthlyData: {
    month: number;
    exerciseGoalsCompleted: number;
    eatingGoalsCompleted: number;
  }[],
  dataType: 'eating' | 'exercise'
) => {
  const yearlyData = new Array(12).fill(0);

  monthlyData.forEach((data) => {
    const arrayIndex = data.month - 1;
    if (arrayIndex >= 0 && arrayIndex < 12) {
      if (dataType === 'eating') {
        yearlyData[arrayIndex] = data.eatingGoalsCompleted;
      } else {
        yearlyData[arrayIndex] = data.exerciseGoalsCompleted;
      }
    }
  });

  return yearlyData;
};

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
      const yearlyEatingGoals = new Array(12).fill(0);
      return res.status(200).json({ yearlyEatingGoals });
    }

    const yearlyEatingGoals = formatYearlyData(userYearlyInfo.month, 'eating');
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
      const yearlyExerciseGoals = new Array(12).fill(0);
      return res.status(200).json({ yearlyExerciseGoals });
    }

    const yearlyExerciseGoals = formatYearlyData(
      userYearlyInfo.month,
      'exercise'
    );
    res.status(200).json({ yearlyExerciseGoals });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Server Error',
    });
  }
};
