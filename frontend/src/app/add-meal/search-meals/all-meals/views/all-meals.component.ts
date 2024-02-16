import { Component } from '@angular/core';
import { MealLookupService } from '../services/meal-lookup.service';
import { IFood } from 'src/app/add-meal/models/food';
import { MealDetailsComponent } from 'src/app/add-meal/meal-details/meal-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'all-meals',
  templateUrl: './all-meals.component.html',
})
// In your component
export class AllMealsComponent {
  mealSearch: string = '';
  meals: IFood[] = [];
  loading: boolean = false;

  submitButtonPressed: boolean = false;

  constructor(
    private mealLookupService: MealLookupService,
    private dialog: MatDialog
  ) {}

  Lookup(meal: string) {
    this.submitButtonPressed = true;
    this.loading = true;
    if (meal === '') {
      this.meals = [];
      this.loading = false;
      return;
    }
    this.mealLookupService
      .searchMeals(meal)
      .then((data: IFood[]) => {
        this.meals = data;
        this.meals = data.map((meal: IFood) => {
          return {
            ...meal,
            description: this.formatFoodName(meal.description),
            ingredients: this.formatFoodName(meal.ingredients),
          };
        });
        this.loading = false;
      })
      .catch((error: any) => {
        console.error('Error:', error);
        this.loading = false;
      });
  }

  openFoodDetails(food: IFood): void {
    this.dialog.open(MealDetailsComponent, {
      data: {
        food,
        buttons: [
          { text: 'Add Food', action: 'addFood' },
          { text: 'Favorite', action: 'addFavoriteFood' },
        ],
      },
      width: '500px',
      height: '500px',
    });
  }

  formatFoodName(name: string): string {
    if (!name) {
      return '';
    }
    return name
      .toLowerCase()
      .split(',')
      .map((word) => word.trim())
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(', ');
  }
}
