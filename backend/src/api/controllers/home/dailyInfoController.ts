import mongoose, { Types } from 'mongoose';
import { Request, Response } from 'express';
import DailyInfo from '../../models/db/dailyInfo';
import Goals from '../../models/db/goals';
import { IExerciseInfo } from '../../models/api/home/exercise-info';
import { IDailyEatingInfo } from '../../models/api/home/daily-eating-info';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getDailyEatingInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const [userDailyInfo, userGoals] = await Promise.all([
      DailyInfo.aggregate([
        { $match: { userID: new Types.ObjectId(userID) } },
        { $unwind: '$foods' },
        {
          $group: {
            _id: null,
            calories: { $sum: '$foods.nutritions.calories' },
            protein: { $sum: '$foods.nutritions.protein' },
            carbs: { $sum: '$foods.nutritions.carbs' },
            fat: { $sum: '$foods.nutritions.fat' },
            fiber: { $sum: '$foods.nutritions.fiber' },
          },
        },
        {
          $project: {
            _id: 0,
            calories: 1,
            protein: 1,
            carbs: 1,
            fat: 1,
            fiber: 1,
          },
        },
      ]),
      Goals.findOne({ userID: userID }).lean(),
    ]);

    if (!userDailyInfo.length) {
      return res
        .status(404)
        .json({ message: 'Daily Info not found for this user' });
    }

    if (!userGoals) {
      return res.status(404).json({ message: 'Goals not found for this user' });
    }

    const dailyEatingInfo: IDailyEatingInfo = {
      goals: {
        caloriesGoal: userGoals.foodGoals.calories,
        proteinGoal: userGoals.foodGoals.protein,
        carbsGoal: userGoals.foodGoals.carbs,
        fatGoal: userGoals.foodGoals.fat,
        fiberGoal: userGoals.foodGoals.fiber,
      },
      totals: userDailyInfo[0],
    };

    res.status(200).json(dailyEatingInfo);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailyExerciseInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const aggregationResult = await DailyInfo.aggregate([
      { $match: { userID: new Types.ObjectId(userID) } },
      { $unwind: '$exercisesCompleted' },
      {
        $group: {
          _id: null,
          chestSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Chest'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          calveSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Calves'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          hamstringSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Hamstrings'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          quadSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Quads'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          gluteSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Glutes'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          shoulderSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Shoulders'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          tricepSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Triceps'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          forearmSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Forearms'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          bicepSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Biceps'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          backSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Back'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
          abSets: {
            $sum: {
              $cond: [
                { $eq: ['$exercisesCompleted.muscleGroup', 'Abs'] },
                '$exercisesCompleted.sets',
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          chestSets: 1,
          calveSets: 1,
          hamstringSets: 1,
          quadSets: 1,
          gluteSets: 1,
          shoulderSets: 1,
          tricepSets: 1,
          forearmSets: 1,
          bicepSets: 1,
          backSets: 1,
          abSets: 1,
        },
      },
    ]);

    if (aggregationResult.length === 0) {
      return res
        .status(404)
        .json({ message: 'Daily Info not found for this user' });
    }

    const exerciseInfo: IExerciseInfo = aggregationResult[0];

    res.status(200).json(exerciseInfo);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};
