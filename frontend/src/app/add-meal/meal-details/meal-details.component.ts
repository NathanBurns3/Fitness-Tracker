import { Component, Inject } from '@angular/core';
import { IFood } from '../models/food';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ibutton } from '../models/button';

@Component({
  selector: 'meal-details',
  templateUrl: './meal-details.component.html',
})
export class MealDetailsComponent {
  food: IFood;
  servingSize: string = '';
  nutritions: { [key: string]: number } = {};
  buttons: Ibutton[] = [];
  buttonStyles: { [key: string]: string } = {
    addFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    addFavoriteFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-700 hover:to-gray-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    removeFavoriteFood:
      'rounded-lg border p-2.5 w-32 mx-2 text-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105',
    editFood:
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
    @Inject(MAT_DIALOG_DATA) public data: { food: IFood; buttons: Ibutton[] }
  ) {
    this.food = this.setValues(this.data.food);
    this.nutritions = { ...this.food.nutritions };
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
    if (servingSize < 0) {
      return;
    }
    let servingSizeRatio: number = servingSize / this.food.servingSize;
    for (const key in this.food.nutritions) {
      this.nutritions[key as keyof typeof this.nutritions] = parseFloat(
        (
          this.food.nutritions[key as keyof typeof this.food.nutritions] *
          servingSizeRatio
        ).toFixed(3)
      );
    }
  }

  executeAction(action: string) {
    if (action === 'addFood') {
      this.addFood();
    } else if (action === 'addFavoriteFood') {
      this.addFavoriteFood();
    } else if (action === 'removeFavoriteFood') {
      this.removeFavoriteFood();
    } else if (action === 'editFood') {
      this.editFood();
    } else if (action === 'removeCustomFood') {
      this.removeCustomFood();
    } else if (action === 'saveFood') {
      this.saveFood();
    } else if (action === 'removeFood') {
      this.removeFood();
    }
  }

  addFood() {
    console.log('Add food');
  }

  addFavoriteFood() {
    console.log('Add favorite food');
  }

  removeFavoriteFood() {
    console.log('Remove favorite food');
  }

  editFood() {
    console.log('Edit food');
  }

  removeCustomFood() {
    console.log('Remove custom food');
  }

  saveFood() {
    console.log('Save food');
  }

  removeFood() {
    console.log('Remove food');
  }
}
