import { IFood } from './food';

export interface ICustomMeal {
  id: string;
  name: string;
  servingUnit: string;
  servingSize: number;
  food: IFood[];
}
