import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICustomMeal } from 'src/app/add-meal/models/custom-meal';
import { IFood } from 'src/app/add-meal/models/food';

@Injectable({
  providedIn: 'root',
})
export class CustomMealService {
  customMeals: ICustomMeal[] = [
    {
      id: '1',
      name: 'Custom Meal 1',
      servingUnit: 'g',
      servingSize: 1,
      food: [
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
      ],
    },
    {
      id: '2',
      name: 'Custom Meal 2',
      servingUnit: 'g',
      servingSize: 50,
      food: [
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
          fdcID: 4,
          description: 'Grapes',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'grape',
          packageWeight: '18g',
          ingredients: 'grape',
          nutritions: {
            calories: 62,
            protein: 1.2,
            carbs: 15,
            fat: 0.2,
            fiber: 3.1,
          },
        },
      ],
    },
    {
      id: '3',
      name: 'Custom Meal 3',
      servingUnit: 'g',
      servingSize: 10,
      food: [
        {
          fdcID: 5,
          description: 'Strawberry',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'strawberry',
          packageWeight: '18g',
          ingredients: 'strawberry',
          nutritions: {
            calories: 32,
            protein: 0.7,
            carbs: 8,
            fat: 0.3,
            fiber: 2,
          },
        },
        {
          fdcID: 6,
          description: 'Blueberry',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'blueberry',
          packageWeight: '18g',
          ingredients: 'blueberry',
          nutritions: {
            calories: 32,
            protein: 0.7,
            carbs: 8,
            fat: 0.3,
            fiber: 2,
          },
        },
      ],
    },
    {
      id: '4',
      name: 'Custom Meal 4',
      servingUnit: 'g',
      servingSize: 100,
      food: [
        {
          fdcID: 7,
          description: 'Pineapple',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'pineapple',
          packageWeight: '18g',
          ingredients: 'pineapple',
          nutritions: {
            calories: 50,
            protein: 0.5,
            carbs: 13,
            fat: 0.1,
            fiber: 2.3,
          },
        },
        {
          fdcID: 8,
          description: 'Mango',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'mango',
          packageWeight: '18g',
          ingredients: 'mango',
          nutritions: {
            calories: 60,
            protein: 0.8,
            carbs: 15,
            fat: 0.4,
            fiber: 1.6,
          },
        },
      ],
    },
    {
      id: '5',
      name: 'Custom Meal 5',
      servingUnit: 'g',
      servingSize: 1,
      food: [
        {
          fdcID: 9,
          description: 'Peach',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'peach',
          packageWeight: '18g',
          ingredients: 'peach',
          nutritions: {
            calories: 59,
            protein: 1.4,
            carbs: 15,
            fat: 0.4,
            fiber: 2.3,
          },
        },
        {
          fdcID: 10,
          description: 'Pear',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'pear',
          packageWeight: '18g',
          ingredients: 'pear',
          nutritions: {
            calories: 57,
            protein: 0.6,
            carbs: 15,
            fat: 0.2,
            fiber: 3.1,
          },
        },
      ],
    },
    {
      id: '6',
      name: 'Custom Meal 6',
      servingUnit: 'g',
      servingSize: 1,
      food: [
        {
          fdcID: 11,
          description: 'Kiwi',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'kiwi',
          packageWeight: '18g',
          ingredients: 'kiwi',
          nutritions: {
            calories: 61,
            protein: 1.1,
            carbs: 15,
            fat: 0.5,
            fiber: 3,
          },
        },
        {
          fdcID: 12,
          description: 'Watermelon',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'watermelon',
          packageWeight: '18g',
          ingredients: 'watermelon',
          nutritions: {
            calories: 30,
            protein: 0.6,
            carbs: 8,
            fat: 0.2,
            fiber: 0.4,
          },
        },
      ],
    },
    {
      id: '7',
      name: 'Custom Meal 7',
      servingUnit: 'g',
      servingSize: 1,
      food: [
        {
          fdcID: 13,
          description: 'Cantaloupe',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'cantaloupe',
          packageWeight: '18g',
          ingredients: 'cantaloupe',
          nutritions: {
            calories: 34,
            protein: 0.8,
            carbs: 8,
            fat: 0.2,
            fiber: 1.3,
          },
        },
        {
          fdcID: 14,
          description: 'Honeydew',
          brandName: 'Generic',
          servingSize: 1,
          servingUnit: 'honeydew',
          packageWeight: '18g',
          ingredients: 'honeydew',
          nutritions: {
            calories: 36,
            protein: 0.5,
            carbs: 9,
            fat: 0.2,
            fiber: 0.9,
          },
        },
      ],
    },
  ];

  constructor(private snackBar: MatSnackBar) {}

  getCustomMeals(): ICustomMeal[] {
    return this.customMeals;
  }

  getCustomMeal(id: string): ICustomMeal | undefined {
    return this.customMeals.find((m) => m.id === id);
  }

  deleteCustomMeal(id: string): void {
    const meal: ICustomMeal | undefined = this.customMeals.find(
      (m) => m.id === id
    );
    const index: number = this.customMeals.findIndex((m) => m.id === id);

    if (meal) {
      this.snackBar.open(meal.name + ' was removed!', '', {
        duration: 2000,
      });
      this.customMeals.splice(index, 1);
    }
  }

  updateCustomMeal(meal: ICustomMeal, action: string): void {
    if (action === 'add') {
      this.customMeals.push(meal);
      this.snackBar.open(meal.name + ' was added!', '', {
        duration: 2000,
      });
      return;
    }
    const index: number = this.customMeals.findIndex((m) => m.id === meal.id);
    this.customMeals[index] = meal;
    this.snackBar.open(meal.name + ' was updated!', '', {
      duration: 2000,
    });
  }

  getNumberOfCustomMeals(): number {
    return this.customMeals.length;
  }
}
