import mongoose, { Schema, Document } from 'mongoose';

interface ICustomMeals extends Document {
  userID: mongoose.Types.ObjectId;
  meals: Array<{
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

const CustomMealsSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  meals: [
    {
      mealName: { type: String, required: true },
      servingUnit: { type: String, required: true },
      foods: [
        {
          fdcID: { type: Number, required: true },
          description: { type: String, required: true },
          brandName: { type: String, required: true },
          servingSize: { type: Number, required: true },
          servingUnit: { type: String, required: true },
          packageWeight: String,
          ingredients: { type: String, required: true },
          nutritions: {
            calories: { type: Number, required: true },
            protein: { type: Number, required: true },
            carbs: { type: Number, required: true },
            fat: { type: Number, required: true },
            fiber: { type: Number, required: true },
          },
        },
      ],
      validate: [arrayLimit50, '{PATH} exceeds the limit of 50'],
    },
  ],
});

function arrayLimit50(val: any) {
  return val.length <= 50;
}

export default mongoose.model<ICustomMeals>('CustomMeals', CustomMealsSchema);
