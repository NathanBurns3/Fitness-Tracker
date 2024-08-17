import mongoose from 'mongoose';
import { IFood } from '../meals/food';

export interface ICustomMeal {
  mealID: mongoose.Types.ObjectId;
  name: string;
  servingUnit: string;
  servingSize: number;
  food: IFood[];
}
