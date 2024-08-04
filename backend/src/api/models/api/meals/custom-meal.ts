import mongoose from 'mongoose';
import { IFood } from '../meals/food';

export interface ICustomMeal {
  id: mongoose.Types.ObjectId;
  name: string;
  servingUnit: string;
  servingSize: number;
  food: IFood[];
}
