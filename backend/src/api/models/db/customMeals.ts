import mongoose, { Schema, Document } from 'mongoose';

interface ICustomMealsDB extends Document {
  userID: mongoose.Types.ObjectId;
  meals: Array<{
    mealID: mongoose.Types.ObjectId;
    mealName: string;
    servingUnit: string;
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
  }>;
}

const CustomMealsSchema: Schema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, required: true },
    meals: [
      {
        _id: false,
        mealID: { type: Schema.Types.ObjectId, required: true },
        mealName: { type: String, required: true },
        servingUnit: { type: String, required: true },
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
    ],
  },
  {
    collection: 'CustomMeals',
  }
);

function arrayLimit50(val: any) {
  return val.length <= 50;
}

export default mongoose.model<ICustomMealsDB>('CustomMeals', CustomMealsSchema);
