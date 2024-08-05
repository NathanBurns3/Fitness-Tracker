import mongoose, { Schema, Document } from 'mongoose';

interface IYearlyInfoDB extends Document {
  userID: mongoose.Types.ObjectId;
  month: Array<{
    month: number;
    exerciseGoalsCompleted: number;
    eatingGoalsCompleted: number;
  }>;
}

const YearlyInfoSchema: Schema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, required: true },
    month: [
      {
        _id: false,
        month: { type: Number, required: true },
        exerciseGoalsCompleted: { type: Number, required: true },
        eatingGoalsCompleted: { type: Number, required: true },
      },
    ],
  },
  {
    collection: 'YearlyInfo',
  }
);

export default mongoose.model<IYearlyInfoDB>('YearlyInfo', YearlyInfoSchema);
