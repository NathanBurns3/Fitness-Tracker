import mongoose, { Schema, Document } from 'mongoose';

interface IDailyInfoDB extends Document {
  userID: mongoose.Types.ObjectId;
  exercisesCompleted: Array<{
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
    sets: number;
  }>;
  foods: Array<{
    fdcID: number;
    description: string;
    brandName: string;
    servingSize: number;
    servingUnit: string;
    packageWeight?: string;
    ingredients: string;
    nutritions: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
  }>;
}

const DailyInfoSchema: Schema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, required: true },
    exercisesCompleted: {
      type: [
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
          sets: { type: Number, required: true },
        },
      ],
      validate: [arrayLimit30, '{PATH} exceeds the limit of 30'],
    },
    foods: {
      type: [
        {
          _id: false,
          fdcID: { type: Number, required: true },
          description: { type: String, required: true },
          brandName: { type: String, required: true },
          servingSize: { type: Number, required: true },
          servingUnit: { type: String, required: true },
          packageWeight: { type: String },
          ingredients: { type: String, required: true },
          nutritions: {
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
        },
      ],
      validate: [arrayLimit50, '{PATH} exceeds the limit of 50'],
    },
  },
  {
    collection: 'DailyInfo',
  }
);

function arrayLimit30(val: any) {
  return val.length <= 30;
}

function arrayLimit50(val: any) {
  return val.length <= 50;
}

export default mongoose.model<IDailyInfoDB>('DailyInfo', DailyInfoSchema);
