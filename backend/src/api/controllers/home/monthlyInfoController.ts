import mongoose, { Types } from 'mongoose';
import { Request, Response } from 'express';
import MonthlyInfo from '../../models/db/monthlyInfo';
import { IExerciseInfo } from '../../models/api/home/exercise-info';
import { IMonthlyBreakdownInfo } from '../../models/api/home/monthly-breakdown-info';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getMonthlyExerciseInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const aggregationPipeline = [
      { $match: { userID: new Types.ObjectId(userID) } },
      { $unwind: { path: '$sets', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: null,
          chestSets: {
            $sum: {
              $cond: [{ $eq: ['$sets.muscleGroup', 'Chest'] }, '$sets.sets', 0],
            },
          },
          calveSets: {
            $sum: {
              $cond: [
                { $eq: ['$sets.muscleGroup', 'Calves'] },
                '$sets.sets',
                0,
              ],
            },
          },
          hamstringSets: {
            $sum: {
              $cond: [
                { $eq: ['$sets.muscleGroup', 'Hamstrings'] },
                '$sets.sets',
                0,
              ],
            },
          },
          quadSets: {
            $sum: {
              $cond: [{ $eq: ['$sets.muscleGroup', 'Quads'] }, '$sets.sets', 0],
            },
          },
          gluteSets: {
            $sum: {
              $cond: [
                { $eq: ['$sets.muscleGroup', 'Glutes'] },
                '$sets.sets',
                0,
              ],
            },
          },
          shoulderSets: {
            $sum: {
              $cond: [
                { $eq: ['$sets.muscleGroup', 'Shoulders'] },
                '$sets.sets',
                0,
              ],
            },
          },
          tricepSets: {
            $sum: {
              $cond: [
                { $eq: ['$sets.muscleGroup', 'Triceps'] },
                '$sets.sets',
                0,
              ],
            },
          },
          forearmSets: {
            $sum: {
              $cond: [
                { $eq: ['$sets.muscleGroup', 'Forearms'] },
                '$sets.sets',
                0,
              ],
            },
          },
          bicepSets: {
            $sum: {
              $cond: [
                { $eq: ['$sets.muscleGroup', 'Biceps'] },
                '$sets.sets',
                0,
              ],
            },
          },
          backSets: {
            $sum: {
              $cond: [{ $eq: ['$sets.muscleGroup', 'Back'] }, '$sets.sets', 0],
            },
          },
          abSets: {
            $sum: {
              $cond: [{ $eq: ['$sets.muscleGroup', 'Abs'] }, '$sets.sets', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ];

    const result = await MonthlyInfo.aggregate(aggregationPipeline);

    const monthlyExerciseInfo: IExerciseInfo = result[0] || {
      chestSets: 0,
      calveSets: 0,
      hamstringSets: 0,
      quadSets: 0,
      gluteSets: 0,
      shoulderSets: 0,
      tricepSets: 0,
      forearmSets: 0,
      bicepSets: 0,
      backSets: 0,
      abSets: 0,
    };

    res.status(200).json(monthlyExerciseInfo);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlyBreakdownInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    const userMonthlyInfo: IMonthlyBreakdownInfo[] =
      await MonthlyInfo.aggregate([
        { $match: { userID: new Types.ObjectId(userID) } },
        {
          $unwind: {
            path: '$goalsCompleted',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            day: { $dayOfMonth: '$goalsCompleted.day' },
            exerciseGoal: '$goalsCompleted.exerciseGoal',
            eatingGoal: '$goalsCompleted.eatingGoal',
          },
        },
      ]);

    if (userMonthlyInfo.length === 0) {
      return res
        .status(404)
        .json({ message: 'Monthly Info not found for this user' });
    }

    res.status(200).json(userMonthlyInfo);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};
