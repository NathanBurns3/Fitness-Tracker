import mongoose, { Schema, Document } from 'mongoose';

interface IFavoriteFoods extends Document {
  userID: mongoose.Types.ObjectId;
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

const FavoriteFoodsSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  foods: [
    {
      fdcID: { type: Number, required: true },
      description: { type: String, required: true },
      brandName: { type: String, required: true },
      servingSize: { type: Schema.Types.Mixed, required: true }, // Mixed type for double and int
      servingUnit: { type: String, required: true },
      packageWeight: String,
      ingredients: { type: String, required: true },
      nutritions: {
        calories: { type: Schema.Types.Mixed, required: true }, // Mixed type for double and int
        protein: { type: Schema.Types.Mixed, required: true },
        carbs: { type: Schema.Types.Mixed, required: true },
        fat: { type: Schema.Types.Mixed, required: true },
        fiber: { type: Schema.Types.Mixed, required: true },
      },
    },
  ],
  validate: [arrayLimit50, '{PATH} exceeds the limit of 50'],
});

function arrayLimit50(val: any) {
  return val.length <= 50;
}

export default mongoose.model<IFavoriteFoods>(
  'FavoriteFoods',
  FavoriteFoodsSchema
);
