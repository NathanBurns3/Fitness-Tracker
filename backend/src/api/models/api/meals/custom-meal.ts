import { IFood } from '../meals/food';

export interface ICustomMeal {
  id: number;
  name: string;
  servingUnit: string;
  servingSize: number;
  food: IFood[];
}
