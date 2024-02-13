import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/add-meal/models/food';
import { FavoriteMealsService } from '../services/favorite-meals.service';

@Component({
  selector: 'favorite-meals',
  templateUrl: './favorite-meals.component.html',
})
export class FavoriteMealsComponent implements OnInit {
  favoriteMeals: IFood[] = [];
  starImage = 'assets/star-yellow.png';
  constructor(private favoriteMealsService: FavoriteMealsService) {}
  ngOnInit(): void {
    this.favoriteMeals = this.favoriteMealsService.getFavoriteMeals();
  }
}
