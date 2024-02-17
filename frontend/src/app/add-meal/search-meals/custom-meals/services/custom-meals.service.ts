import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFood } from 'src/app/add-meal/models/food';

@Injectable({
  providedIn: 'root',
})
export class CustomMealService {
  customMeals: IFood[] = [
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

  constructor(private snackBar: MatSnackBar) {}

  getCustomMeals(): IFood[] {
    return this.customMeals;
  }

  deleteCustomMeal(meal: IFood): void {
    const index = this.customMeals.findIndex((m) => m.fdcID === meal.fdcID);
    this.customMeals.splice(index, 1);
    this.snackBar.open(
      meal.description + ' was removed from custom meals!',
      '',
      {
        duration: 2000,
      }
    );
  }
}
