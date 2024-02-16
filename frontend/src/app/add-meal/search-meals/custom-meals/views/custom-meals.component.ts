import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/add-meal/models/food';
import { CustomMealService } from '../services/custom-meals.service';
import { MatDialog } from '@angular/material/dialog';
import { MealDetailsComponent } from 'src/app/add-meal/meal-details/meal-details.component';

@Component({
  selector: 'custom-meals',
  templateUrl: './custom-meals.component.html',
})
export class CustomMealsComponent implements OnInit {
  customMeals: IFood[] = [];

  constructor(
    private customMealService: CustomMealService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customMeals = this.customMealService.getCustomMeals();
  }
  addCustomMeal(): void {
    console.log('Add custom meal');
  }

  openFoodDetails(food: IFood): void {
    this.dialog.open(MealDetailsComponent, {
      data: {
        food,
        buttons: [
          { text: 'Add Meal', action: 'addFood' },
          { text: 'Edit Meal', action: 'editFood' },
          { text: 'Remove Meal', action: 'removeCustomFood' },
        ],
      },
      width: '500px',
      height: '500px',
    });
  }
}
