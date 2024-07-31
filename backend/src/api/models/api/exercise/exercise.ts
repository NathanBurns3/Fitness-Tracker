import mongoose from 'mongoose';

export interface IExercise {
  exerciseID: mongoose.Types.ObjectId;
  muscleGroup: string;
  exerciseName: string;
  sets: number;
}
