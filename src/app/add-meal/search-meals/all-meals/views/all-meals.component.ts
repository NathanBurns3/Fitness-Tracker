import { Component } from '@angular/core';
import { MealLookupService } from '../services/meal-lookup.service';
import { IFood } from 'src/app/add-meal/models/food';

@Component({
  selector: 'all-meals',
  templateUrl: './all-meals.component.html',
})
export class AllMealsComponent {
  mealSearch: string = '';
  meals: IFood[] = [];

  constructor(private mealLookupService: MealLookupService) {}

  Lookup(meal: string) {
    console.log(meal);
    this.mealLookupService
      .searchMeals(meal)
      .then((data) => {
        this.meals = data;
        console.log(this.meals);
      })
      .catch((error) => console.error('Error:', error));
  }
}
