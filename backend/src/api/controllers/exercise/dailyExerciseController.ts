import { Request, Response } from 'express';
import { IExercise } from '../../models/api/exercise/exercise';
import DailyInfo from '../../models/db/dailyInfo';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getDailyExercises = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    const dailyInfo = await DailyInfo.findOne({ userID: userID });

    if (!dailyInfo) {
      return res
        .status(404)
        .json({ message: 'No daily exercises found for this user.' });
    }

    const exercises: IExercise[] = dailyInfo.exercisesCompleted.map(
      (exercise) => ({
        exerciseID: exercise.exerciseID,
        muscleGroup: exercise.muscleGroup,
        exerciseName: exercise.exerciseName,
        sets: exercise.sets,
      })
    );

    return res.status(200).json(exercises);
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
};

export const addDailyExercise = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { exercise }: { exercise: IExercise } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    const userDailyInfo = await DailyInfo.findOne({ userID: userID });
    if (userDailyInfo && userDailyInfo.exercisesCompleted.length >= 30) {
      return res.status(400).json({
        message: 'Maxed out the amount of exercises for the day!',
        success: false,
      });
    }

    const newExercise: IExercise = {
      exerciseID: new mongoose.Types.ObjectId(),
      muscleGroup: exercise.muscleGroup,
      exerciseName: exercise.exerciseName,
      sets: exercise.sets,
    };

    const updatedDailyExercises = await DailyInfo.findOneAndUpdate(
      { userID: userID },
      {
        $push: { exercisesCompleted: newExercise },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      exercises: updatedDailyExercises.exercisesCompleted,
      success: true,
    });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateDailyExercise = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const {
      exerciseID,
      exercise,
    }: { exerciseID: string; exercise: IExercise } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) {
      return res
        .status(400)
        .json({ message: 'Invalid exercise ID.', success: false });
    }

    const updatedDailyExercises = await DailyInfo.findOneAndUpdate(
      { userID: userID, 'exercisesCompleted.exerciseID': exerciseID },
      {
        $set: {
          'exercisesCompleted.$.muscleGroup': exercise.muscleGroup,
          'exercisesCompleted.$.exerciseName': exercise.exerciseName,
          'exercisesCompleted.$.sets': exercise.sets,
        },
      },
      { new: true }
    );

    if (!updatedDailyExercises) {
      return res
        .status(404)
        .json({ message: 'Daily exercise not found.', success: false });
    }

    res.status(200).json({
      exercises: updatedDailyExercises.exercisesCompleted,
      success: true,
    });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteDailyExercise = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { exerciseID } = req.params;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) {
      return res
        .status(400)
        .json({ message: 'Invalid exercise ID.', success: false });
    }

    const updatedDailyExercises = await DailyInfo.findOneAndUpdate(
      { userID: userID },
      { $pull: { exercisesCompleted: { exerciseID: exerciseID } } },
      { new: true }
    );

    if (!updatedDailyExercises) {
      return res
        .status(404)
        .json({ message: 'Daily exercise not found.', success: false });
    }

    res.status(200).json({
      exercises: updatedDailyExercises.exercisesCompleted,
      success: true,
    });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
};
