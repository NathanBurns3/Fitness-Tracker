import mongoose, { Schema, Document } from 'mongoose';

interface IMonthlyInfo extends Document {
  userID: mongoose.Types.ObjectId;
  sets: Array<{
    muscleGroup:
      | 'Abs'
      | 'Back'
      | 'Biceps'
      | 'Calves'
      | 'Chest'
      | 'Forearms'
      | 'Glutes'
      | 'Hamstrings'
      | 'Quads'
      | 'Shoulders'
      | 'Triceps';
    sets: number;
  }>;
  goalsCompleted: Array<{
    day: Date;
    exerciseGoal: boolean;
    eatingGoal: boolean;
  }>;
}

const MonthlyInfoSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  sets: {
    type: [
      {
        muscleGroup: {
          type: String,
          required: true,
          enum: [
            'Abs',
            'Back',
            'Biceps',
            'Calves',
            'Chest',
            'Forearms',
            'Glutes',
            'Hamstrings',
            'Quads',
            'Shoulders',
            'Triceps',
          ],
        },
        sets: { type: Number, required: true },
      },
    ],
  },
  goalsCompleted: {
    type: [
      {
        day: { type: Date, required: true },
        exerciseGoal: { type: Boolean, required: true },
        eatingGoal: { type: Boolean, required: true },
      },
    ],
  },
});

export default mongoose.model<IMonthlyInfo>('MonthlyInfo', MonthlyInfoSchema);
