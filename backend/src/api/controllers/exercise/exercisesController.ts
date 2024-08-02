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
    const { muscleGroup } = req.body;
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
        'items.$': 1,
      }
    );

    if (!exercises.length) {
      return res.status(200).json([]);
    }

    const exerciseNames: IExercise[] = exercises.flatMap((exercise) =>
      exercise.items.map((item) => ({
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

export const getExerciseExist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { muscleGroup, exerciseName } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    if (!(muscleGroup in muscleGroupsEnum)) {
      return res.status(400).json({ message: 'Invalid muscle group.' });
    }

    const exerciseExists = await Exercises.exists({
      userID: userID,
      items: {
        $elemMatch: {
          muscleGroup: muscleGroup,
          exerciseName: exerciseName,
        },
      },
    });

    return res.status(200).json({ exists: !!exerciseExists });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const addExercise = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userID = req.user?.id;
    const { muscleGroup, exerciseName } = req.body;
    if (!(muscleGroup in muscleGroupsEnum)) {
      return res.status(400).json({ message: 'Invalid muscle group.' });
    }
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
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

    res.status(200).json(updatedExercises);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
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
      return res.status(400).json({ message: 'Invalid muscle group.' });
    }
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) {
      return res.status(400).json({ message: 'Invalid exercise ID.' });
    }

    const updatedExercises = await Exercises.findOneAndUpdate(
      { userID },
      { $pull: { items: { exerciseID } } },
      { new: true }
    );

    res.status(200).json(updatedExercises);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};
