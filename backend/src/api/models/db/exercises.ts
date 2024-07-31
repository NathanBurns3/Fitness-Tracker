import mongoose, { Schema, Document } from 'mongoose';

interface IExercisesDB extends Document {
  userID: mongoose.Types.ObjectId;
  items: Array<{
    exerciseID: mongoose.Types.ObjectId;
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
    exerciseName: string;
  }>;
}

const ExercisesSchema: Schema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, required: true },
    items: [
      {
        _id: false,
        exerciseID: { type: Schema.Types.ObjectId, required: true },
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
        exerciseName: { type: String, required: true },
      },
    ],
  },
  {
    collection: 'Exercises',
  }
);

export default mongoose.model<IExercisesDB>('Exercises', ExercisesSchema);
