import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/add-meal/models/food';
import { FavoriteMealService } from '../services/favorite-meal.service';

@Component({
  selector: 'favorite-meals',
  templateUrl: './favorite-meals.component.html',
})
export class FavoriteMealsComponent implements OnInit {
  favoriteMeals: IFood[] = [];
  starImage = 'assets/star-yellow.png';

  constructor(private favoriteMealService: FavoriteMealService) {}

  ngOnInit(): void {
    this.favoriteMeals = this.favoriteMealService.getFavoriteMeals();
  }
}
