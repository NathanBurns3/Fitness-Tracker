import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFood } from 'src/app/add-meal/models/food';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMealsService {
  favoriteMeals: IFood[] = [
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
      },
    },
  ];

  constructor(private snackBar: MatSnackBar) {}

  getFavoriteMeals(): IFood[] {
    return this.favoriteMeals;
  }

  deleteFavoriteMeal(meal: IFood): void {
    const index = this.favoriteMeals.findIndex((x) => x.fdcID === meal.fdcID);
    this.favoriteMeals.splice(index, 1);
    this.snackBar.open(meal.description + ' was removed from favorites!', '', {
      duration: 2000,
    });
  }

  addFavoriteMeal(meal: IFood): void {
    if (this.favoriteMeals.includes(meal)) {
      this.snackBar.open(
        meal.description + ' is already in your favorites!',
        '',
        {
          duration: 2000,
        }
      );
      return;
    }
    this.favoriteMeals.push(meal);
    this.snackBar.open(meal.description + ' added to favorites!', '', {
      duration: 2000,
    });
  }
}
