import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/add-meal/models/food';
import { FavoriteMealsService } from '../services/favorite-meals.service';
import { MatDialog } from '@angular/material/dialog';
import { MealDetailsComponent } from 'src/app/add-meal/meal-details/meal-details.component';

@Component({
  selector: 'favorite-meals',
  templateUrl: './favorite-meals.component.html',
  styleUrls: ['./favorite-meals.component.css'],
})
export class FavoriteMealsComponent implements OnInit {
  favoriteMeals: IFood[] = [];
  starImage = 'assets/star-yellow.png';

  constructor(
    private favoriteMealsService: FavoriteMealsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.favoriteMealsService.getFavoriteMeals().subscribe((meals) => {
      this.favoriteMeals = meals;
    });
  }

  openFoodDetails(food: IFood): void {
    this.dialog.open(MealDetailsComponent, {
      data: {
        food,
        buttons: [
          { text: 'Add Food', action: 'addFood' },
          { text: 'Remove Favorite', action: 'removeFavoriteFood' },
        ],
      },
      width: '600px',
      height: '600px',
    });
  }
}
