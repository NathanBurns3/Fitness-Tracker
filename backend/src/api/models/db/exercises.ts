import mongoose, { Schema, Document } from 'mongoose';

interface IExercises extends Document {
  userID: mongoose.Types.ObjectId;
  items: Array<{
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

const ExercisesSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  items: [
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
      exerciseName: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IExercises>('Exercises', ExercisesSchema);
