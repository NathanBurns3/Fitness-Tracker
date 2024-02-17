import { Component, Inject } from '@angular/core';
import { IFood } from '../models/food';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ibutton } from '../models/button';
import { FavoriteMealsService } from '../search-meals/favorite-meals/services/favorite-meals.service';
import { CustomMealService } from '../search-meals/custom-meals/services/custom-meals.service';
import { MealLookupService } from '../search-meals/all-meals/services/meal-lookup.service';
import { DailyFoodService } from '../meal-list/services/daily-food.service';

@Component({
  selector: 'meal-details',
  templateUrl: './meal-details.component.html',
})
export class MealDetailsComponent {
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
    @Inject(MAT_DIALOG_DATA) public data: { food: IFood; buttons: Ibutton[] },
    private favoriteMealsService: FavoriteMealsService,
    private customMealService: CustomMealService,
    private mealLookupService: MealLookupService,
    private dailyFoodService: DailyFoodService
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

  addFood() {
    this.mealLookupService.addMeal(this.clonedFood);
    this.closeMealDetails();
  }

  addFavoriteFood() {
    this.favoriteMealsService.addFavoriteMeal(this.food);
  }

  removeFavoriteFood() {
    this.favoriteMealsService.deleteFavoriteMeal(this.food);
    this.closeMealDetails();
  }

  editCustomFood() {
    //TODO: Implement edit custom food
    console.log('Edit food');
  }

  removeCustomFood() {
    this.customMealService.deleteCustomMeal(this.food);
    this.closeMealDetails();
  }

  saveFood() {
    this.dailyFoodService.updateFood(this.clonedFood);
    this.closeMealDetails();
  }

  removeFood() {
    this.dailyFoodService.deleteFood(this.food);
    this.closeMealDetails();
  }
}
