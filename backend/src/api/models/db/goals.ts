import mongoose, { Schema, Document } from 'mongoose';

type NutritionType = 'calories' | 'protein' | 'carbs' | 'fat' | 'fiber';

interface IGoalsDB extends Document {
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
  trackedNutritions: NutritionType[];
}

const GoalsSchema: Schema = new Schema(
  {
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
    trackedNutritions: {
      type: [String],
      required: true,
      enum: ['calories', 'protein', 'carbs', 'fat', 'fiber'],
      default: ['calories', 'protein', 'carbs', 'fat', 'fiber'],
    },
  },
  {
    collection: 'Goals',
  }
);

export default mongoose.model<IGoalsDB>('Goals', GoalsSchema);
