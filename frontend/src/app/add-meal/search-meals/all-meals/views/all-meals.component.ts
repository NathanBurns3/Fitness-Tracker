import { Component } from '@angular/core';
import { MealLookupService } from '../services/meal-lookup.service';
import { IFood } from 'src/app/add-meal/models/food';

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

  constructor(private mealLookupService: MealLookupService) {}

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
      .then((data) => {
        this.meals = data;
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error:', error);
        this.loading = false;
      });
  }
}
