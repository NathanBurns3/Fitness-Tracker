import { EventEmitter, Injectable } from '@angular/core';
import { IFood } from '../../models/food';

@Injectable({
  providedIn: 'root',
})
export class DailyFoodService {
  foodAdded = new EventEmitter<void>();

  foods: IFood[] = [
    {
      fdcID: 1,
      description: 'Apple',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'apple',
      packageWeight: '18g',
      ingredients: 'apple',
      nutritions: {
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3,
        fiber: 4.4,
        sodium: 1,
      },
    },
    {
      fdcID: 2,
      description: 'Banana',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'banana',
      packageWeight: '18g',
      ingredients: 'banana',
      nutritions: {
        calories: 105,
        protein: 1.3,
        carbs: 27,
        fat: 0.4,
        fiber: 3.1,
        sodium: 1,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
    {
      fdcID: 3,
      description: 'Orange',
      brandName: 'Generic',
      servingSize: 1,
      servingUnit: 'orange',
      packageWeight: '18g',
      ingredients: 'orange',
      nutritions: {
        calories: 62,
        protein: 1.2,
        carbs: 15,
        fat: 0.2,
        fiber: 3.1,
        sodium: 0,
      },
    },
  ];

  getFoods(): IFood[] {
    return this.foods;
  }

  addFood(food: IFood): void {
    this.foods.push(food);
    this.foodAdded.emit();
  }

  updateFood(food: IFood): void {
    const index = this.foods.findIndex((w) => w.fdcID === food.fdcID);
    this.foods[index] = food;
  }

  deleteFood(food: IFood): void {
    const index = this.foods.findIndex((w) => w.fdcID === food.fdcID);
    this.foods.splice(index, 1);
  }
}
