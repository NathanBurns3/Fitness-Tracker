import { Request, Response } from 'express';
import Exercises from '../../models/db/exercises';
import { muscleGroupsEnum } from '../../models/api/exercise/muscle-groups-enum';
import mongoose, { set } from 'mongoose';
import { IExercise } from '../../models/api/exercise/exercise';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getExercises = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { muscleGroup } = req.params;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    if (
      !Object.values(muscleGroupsEnum).includes(muscleGroup as muscleGroupsEnum)
    ) {
      return res.status(400).json({ message: 'Invalid muscle group.' });
    }

    const exercises = await Exercises.find(
      {
        userID: userID,
        'items.muscleGroup': muscleGroup,
      },
      {
        items: 1,
      }
    );

    if (!exercises.length) {
      return res.status(200).json([]);
    }

    const exerciseNames: IExercise[] = exercises.flatMap((exercise) =>
      exercise.items
        .filter((item) => item.muscleGroup === muscleGroup)
        .map((item) => ({
          exerciseID: item.exerciseID,
          muscleGroup: muscleGroup,
          exerciseName: item.exerciseName,
          sets: 0,
        }))
    );

    return res.status(200).json(exerciseNames);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const addExercise = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userID = req.user?.id;
    const { muscleGroup, exerciseName } = req.body;
    if (!(muscleGroup in muscleGroupsEnum)) {
      return res
        .status(400)
        .json({ message: 'Invalid muscle group.', success: false });
    }
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    const userExercises = await Exercises.findOne({ userID });
    if (userExercises) {
      const muscleGroupExercises = userExercises.items.filter(
        (exercise) => exercise.muscleGroup === muscleGroup
      );
      if (muscleGroupExercises.length >= 5) {
        return res.status(400).json({
          message: 'Maxed out the amount of exercises for this muscle group!',
          success: false,
        });
      }

      const exerciseExists = muscleGroupExercises.some(
        (exercise) => exercise.exerciseName === exerciseName
      );
      if (exerciseExists) {
        return res.status(400).json({
          message: 'Exercise name already exists for this muscle group!',
          success: false,
        });
      }
    }

    const newExercise = {
      exerciseID: new mongoose.Types.ObjectId(),
      muscleGroup,
      exerciseName,
    };

    const updatedExercises = await Exercises.findOneAndUpdate(
      { userID },
      { $push: { items: newExercise } },
      { new: true, upsert: true }
    );

    res.status(200).json({ exericses: updatedExercises, success: true });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteExercise = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { muscleGroup, exerciseID } = req.params;
    if (!(muscleGroup in muscleGroupsEnum)) {
      return res
        .status(400)
        .json({ message: 'Invalid muscle group.', success: false });
    }
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

    const updatedExercises = await Exercises.findOneAndUpdate(
      { userID },
      { $pull: { items: { exerciseID } } },
      { new: true }
    );

    res.status(200).json({ exericses: updatedExercises, success: true });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
