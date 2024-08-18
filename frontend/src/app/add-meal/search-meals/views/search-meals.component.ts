import { Component, OnInit, ViewChild } from '@angular/core';
import { FavoriteMealsService } from '../favorite-meals/services/favorite-meals.service';
import { IFood } from '../../models/food';
import { MealDetailsComponent } from '../../meal-details/meal-details.component';
import { CustomMealService } from '../custom-meals/services/custom-meals.service';
import { ICustomMeal } from '../../models/custom-meal';

@Component({
  selector: 'search-meals',
  templateUrl: './search-meals.component.html',
  styleUrls: ['./search-meals.component.css'],
})
export class SearchMealsComponent implements OnInit {
  selectedSearch: string = 'All';
  favoriteMeals: IFood[] = [];
  customMeals: ICustomMeal[] = [];
  isLoading: boolean = false;

  constructor(
    private favoriteMealsService: FavoriteMealsService,
    private customMealService: CustomMealService
  ) {}

  ngOnInit(): void {
    this.getFavoriteMeals();
    this.getCustomMeals();
  }

  selectSearch(searchType: string) {
    this.selectedSearch = searchType;
  }

  getFavoriteMeals(): void {
    this.isLoading = true;
    this.favoriteMealsService.getFavoriteMeals().subscribe((meals) => {
      this.favoriteMeals = meals;
      this.isLoading = false;
    });
  }

  getCustomMeals(): void {
    this.isLoading = true;
    this.customMealService.getCustomMeals().subscribe((meals) => {
      this.customMeals = meals;
      this.isLoading = false;
    });
  }

  getNewFavoriteMeals(meals: IFood[]): void {
    if (meals.length > 0) {
      this.favoriteMeals = meals;
    }
  }
}
