import { IFood } from './food';

export interface ICustomMeal {
  mealID: string;
  name: string;
  servingUnit: string;
  servingSize: number;
  food: IFood[];
}
