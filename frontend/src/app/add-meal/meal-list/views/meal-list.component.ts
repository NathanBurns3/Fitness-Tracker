import { Component } from '@angular/core';
import { IFood } from '../../models/food';
import { DailyFoodService } from '../services/daily-food.service';
import { MatDialog } from '@angular/material/dialog';
import { MealDetailsComponent } from '../../meal-details/meal-details.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent {
  foods: IFood[] = [];

  constructor(
    private dailyFoodService: DailyFoodService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dailyFoodService.getFoods().subscribe((foods) => {
      this.foods = foods;
    });
    this.dailyFoodService.foodAdded
      .pipe(switchMap(() => this.dailyFoodService.getFoods()))
      .subscribe((foods: IFood[]) => {
        this.foods = foods;
      });
  }

  openFoodDetails(food: IFood): void {
    this.dialog.open(MealDetailsComponent, {
      data: {
        food,
        buttons: [
          { text: 'Save Meal', action: 'saveFood' },
          { text: 'Remove Meal', action: 'removeFood' },
        ],
      },
      width: '600px',
      height: '600px',
    });
  }
}
