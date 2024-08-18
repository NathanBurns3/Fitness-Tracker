import { Component, OnInit, ViewChild } from '@angular/core';
import { FavoriteMealsService } from '../favorite-meals/services/favorite-meals.service';
import { IFood } from '../../models/food';
import { MealDetailsComponent } from '../../meal-details/meal-details.component';

@Component({
  selector: 'search-meals',
  templateUrl: './search-meals.component.html',
  styleUrls: ['./search-meals.component.css'],
})
export class SearchMealsComponent implements OnInit {
  selectedSearch: string = 'All';
  favoriteMeals: IFood[] = [];
  isLoading: boolean = false;

  constructor(private favoriteMealsService: FavoriteMealsService) {}

  ngOnInit(): void {
    this.getFavoriteMeals();
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

  getNewFavoriteMeals(meals: IFood[]): void {
    if (meals.length > 0) {
      this.favoriteMeals = meals;
    }
  }
}
