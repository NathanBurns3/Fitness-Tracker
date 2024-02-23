import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/add-meal/models/food';
import { CustomMealService } from '../services/custom-meals.service';
import { MatDialog } from '@angular/material/dialog';
import { MealDetailsComponent } from 'src/app/add-meal/meal-details/meal-details.component';
import { CustomMealDetailsComponent } from 'src/app/add-meal/custom-meal-details/custom-meal-details.component';
import { ICustomMeal } from 'src/app/add-meal/models/custom-meal';

@Component({
  selector: 'custom-meals',
  templateUrl: './custom-meals.component.html',
})
export class CustomMealsComponent implements OnInit {
  customMeals: ICustomMeal[] = [];

  constructor(
    private customMealService: CustomMealService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customMeals = this.customMealService.getCustomMeals();
  }

  addCustomMeal(): void {
    const customMeal: ICustomMeal = {
      id: 100, // generate a new id
      name: '', // set initial name
      servingSize: 1, // set initial serving size
      servingUnit: '', // set initial serving unit
      food: [], // set initial food
    };
    this.dialog.open(CustomMealDetailsComponent, {
      data: { meal: customMeal, title: 'Add Custom Meal' },
      width: '900px',
      height: '750px',
    });
  }

  openFoodDetails(meal: ICustomMeal): void {
    const food: IFood = this.convertToIFood(meal);
    this.dialog.open(MealDetailsComponent, {
      data: {
        food,
        buttons: [
          { text: 'Add Meal', action: 'addFood' },
          { text: 'Edit Meal', action: 'editCustomFood' },
          { text: 'Remove Meal', action: 'removeCustomFood' },
        ],
        customFoodID: meal.id,
      },
      width: '600px',
      height: '600px',
    });
  }

  convertToIFood(meal: ICustomMeal): IFood {
    return {
      fdcID: meal.id,
      description: meal.name,
      brandName: 'Custom',
      servingSize: meal.servingSize,
      servingUnit: meal.servingUnit,
      packageWeight: '0g',
      ingredients: meal.food.map((f) => f.description).join(', '),
      nutritions: {
        calories: parseFloat(
          meal.food
            .reduce((acc, f) => acc + f.nutritions.calories, 0)
            .toFixed(2)
        ),
        protein: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.protein, 0).toFixed(2)
        ),
        carbs: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.carbs, 0).toFixed(2)
        ),
        fat: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.fat, 0).toFixed(2)
        ),
        fiber: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.fiber, 0).toFixed(2)
        ),
        sodium: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.sodium, 0).toFixed(2)
        ),
      },
    };
  }
}
