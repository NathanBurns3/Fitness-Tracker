import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { IFood } from '../models/food';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Ibutton } from '../models/button';
import { FavoriteMealsService } from '../search-meals/favorite-meals/services/favorite-meals.service';
import { CustomMealService } from '../search-meals/custom-meals/services/custom-meals.service';
import { DailyFoodService } from '../meal-list/services/daily-food.service';
import { CustomMealDetailsComponent } from '../custom-meal-details/custom-meal-details.component';
import { ICustomMeal } from '../models/custom-meal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
})
export class MealDetailsComponent {
  @Output() foodUpdate = new EventEmitter<void>();
  @Output() favoriteAdded = new EventEmitter<void>();

  food: IFood;
  clonedFood: IFood;
  buttons: Ibutton[] = [];
  buttonStyles: { [key: string]: string } = {
    addFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    addFavoriteFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-700 hover:to-gray-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    removeFavoriteFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    editCustomFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-700 hover:to-gray-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    removeCustomFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    saveFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    removeFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
  };

  constructor(
    public dialogRef: MatDialogRef<MealDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { food: IFood; buttons: Ibutton[]; customFoodID: string },
    private favoriteMealsService: FavoriteMealsService,
    private customMealService: CustomMealService,
    private dailyFoodService: DailyFoodService,
    private dialog: MatDialog
  ) {
    this.food = this.setValues(this.data.food);
    this.clonedFood = JSON.parse(JSON.stringify(this.food));
    this.buttons = this.data.buttons;
  }

  closeMealDetails() {
    this.dialogRef.close();
  }

  setValues(food: IFood): IFood {
    for (const key in food.nutritions) {
      if (food.nutritions[key as keyof typeof food.nutritions] === undefined) {
        food.nutritions[key as keyof typeof food.nutritions] = 0;
      }
    }
    return food;
  }

  updateNutritions(servingSize: number) {
    if (servingSize <= 0) {
      return;
    }
    const servingRatio = servingSize / this.food.servingSize;
    this.clonedFood.servingSize = servingSize;
    for (const key in this.food.nutritions) {
      const updatedNutrition =
        this.food.nutritions[key as keyof typeof this.food.nutritions] *
        servingRatio;
      this.clonedFood.nutritions[
        key as keyof typeof this.clonedFood.nutritions
      ] = +parseFloat(updatedNutrition.toFixed(2));
    }
  }

  executeAction(action: string) {
    if (action === 'addFood') {
      this.addFood();
    } else if (action === 'addFavoriteFood') {
      this.addFavoriteFood();
    } else if (action === 'removeFavoriteFood') {
      this.removeFavoriteFood();
    } else if (action === 'editCustomFood') {
      this.editCustomFood();
    } else if (action === 'removeCustomFood') {
      this.removeCustomFood();
    } else if (action === 'saveFood') {
      this.saveFood();
    } else if (action === 'removeFood') {
      this.removeFood();
    }
  }

  convertCustomFoodToFood(meal: ICustomMeal): IFood {
    return {
      fdcID: meal.mealID,
      description: meal.name,
      brandName: 'Custom',
      servingSize: meal.servingSize,
      servingUnit: meal.servingUnit,
      packageWeight: '0g',
      ingredients: meal.food.map((f) => f.description).join(', '),
      nutritions: {
        calories: parseFloat(
          meal.food
            .reduce((acc, f) => acc + f.nutritions.calories, 0)
            .toFixed(2)
        ),
        protein: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.protein, 0).toFixed(2)
        ),
        carbs: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.carbs, 0).toFixed(2)
        ),
        fat: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.fat, 0).toFixed(2)
        ),
        fiber: parseFloat(
          meal.food.reduce((acc, f) => acc + f.nutritions.fiber, 0).toFixed(2)
        ),
      },
    };
  }

  addFood() {
    this.dailyFoodService.addFood(this.clonedFood).subscribe((success) => {
      if (success) {
        this.closeMealDetails();
      }
    });
  }

  addFavoriteFood() {
    this.favoriteMealsService
      .addFavoriteMeal(this.food)
      .subscribe((success) => {
        if (success) {
          this.favoriteAdded.emit();
          this.closeMealDetails();
        }
      });
  }

  removeFavoriteFood() {
    this.favoriteMealsService
      .deleteFavoriteMeal(this.food)
      .subscribe((success) => {
        if (success) {
          this.foodUpdate.emit();
          this.closeMealDetails();
        }
      });
  }

  editCustomFood() {
    this.customMealService
      .getCustomMeal(this.data.customFoodID)
      .subscribe((customMeal) => {
        if (customMeal) {
          customMeal.servingSize = this.calculateTotalNutritions(
            customMeal.food
          );
          const dialogRef = this.dialog.open(CustomMealDetailsComponent, {
            data: { meal: customMeal, title: 'Edit Custom Meal' },
            width: '900px',
            height: '750px',
          });

          dialogRef.componentInstance.foodUpdate.subscribe(() => {
            this.foodUpdate.emit();
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.data.food = this.convertCustomFoodToFood(result);
              this.food = this.setValues(this.data.food);
              this.clonedFood = JSON.parse(JSON.stringify(this.food));
            }
          });
        }
      });
  }

  removeCustomFood() {
    this.customMealService
      .deleteCustomMeal(this.data.customFoodID)
      .subscribe((success) => {
        if (success) {
          this.foodUpdate.emit();
          this.closeMealDetails();
        }
      });
  }

  saveFood() {
    this.dailyFoodService.updateFood(this.clonedFood).subscribe((success) => {
      if (success) {
        this.closeMealDetails();
      }
    });
  }

  removeFood() {
    this.dailyFoodService.deleteFood(this.food).subscribe((success) => {
      if (success) {
        this.closeMealDetails();
      }
    });
  }

  preventInvalidCharacters(event: KeyboardEvent) {
    if (event.key === '-' || event.key === '.' || event.key === 'e') {
      event.preventDefault();
    }
  }

  checkMaxLength(event: any): void {
    const maxLength = 4;
    let value = Number(event.target.value);
    if (value.toString().length > maxLength) {
      let truncatedValue = Number(value.toString().slice(0, maxLength));
      event.target.value = truncatedValue;
      this.clonedFood.servingSize = Math.trunc(truncatedValue);
    }
    this.updateNutritions(this.clonedFood.servingSize);
  }

  calculateTotalNutritions(foods: IFood[]): number {
    return foods.reduce((sum, food) => (sum += food.servingSize), 0);
  }
}
