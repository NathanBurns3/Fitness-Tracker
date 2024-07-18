import mongoose, { Schema, Document } from 'mongoose';

interface IGoals extends Document {
  userID: mongoose.Types.ObjectId;
  exerciseStreak: number;
  eatingGoalStreak: number;
  foodGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

const GoalsSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  exerciseStreak: { type: Number, required: true },
  eatingGoalStreak: { type: Number, required: true },
  foodGoals: {
    type: new Schema(
      {
        calories: { type: Number, required: true },
        protein: { type: Number, required: true },
        carbs: { type: Number, required: true },
        fat: { type: Number, required: true },
        fiber: { type: Number, required: true },
      },
      { _id: false }
    ),
    required: true,
  },
});

export default mongoose.model<IGoals>('Goals', GoalsSchema);
