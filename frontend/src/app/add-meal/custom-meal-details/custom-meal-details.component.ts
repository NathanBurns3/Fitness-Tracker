import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomMeal } from '../models/custom-meal';
import { IFood } from '../models/food';
import { MealLookupService } from '../search-meals/all-meals/services/meal-lookup.service';
import { CustomMealService } from '../search-meals/custom-meals/services/custom-meals.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'custom-meal-details',
  templateUrl: './custom-meal-details.component.html',
})
export class CustomMealDetailsComponent {
  title: string;
  customFood: ICustomMeal;
  totalNutritions: IFood['nutritions'] = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
  };
  foods: IFood[] = [];
  mealOptions: IFood[] = [];
  showDropdown = false;
  mealSearch: string = '';
  loading: boolean = false;
  submitButtonPressed: boolean = false;
  foodSelected: boolean = false;
  amount: string = '';
  foodChosen: IFood = {
    fdcID: 0,
    description: '',
    brandName: '',
    servingSize: 0,
    servingUnit: '',
    packageWeight: '',
    ingredients: '',
    nutritions: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    },
  };
  clonedMeal: ICustomMeal;
  noResults: boolean = false;
  servingUnits: string[] = [
    'tsp',
    'tbsp',
    'fl oz',
    'c',
    'pt',
    'qt',
    'gal',
    'ml',
    'l',
    'oz',
    'lb',
    'g',
    'kg',
  ];

  constructor(
    public dialogRef: MatDialogRef<CustomMealDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { meal: ICustomMeal; title: string },
    private mealLookupService: MealLookupService,
    private customMealService: CustomMealService,
    private snackBar: MatSnackBar
  ) {
    this.title = data.title;
    this.customFood = data.meal;
    this.clonedMeal = JSON.parse(JSON.stringify(this.customFood));
    this.foods = this.clonedMeal.food;
    this.totalNutritions = this.calculateTotalNutritions(this.clonedMeal.food);
  }

  updateNutritions(servingSize: number) {
    if (servingSize <= 0) {
      return;
    }
    const servingRatio = servingSize / this.customFood.servingSize;
    this.clonedMeal.servingSize = servingSize;
    for (const key in this.totalNutritions) {
      const updatedNutrition =
        this.totalNutritions[key as keyof typeof this.totalNutritions] *
        servingRatio;
      this.totalNutritions[key as keyof typeof this.totalNutritions] =
        +parseFloat(updatedNutrition.toFixed(2));
    }
  }

  calculateTotalNutritions(food: IFood[]): IFood['nutritions'] {
    const totalNutritions = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    };
    food.forEach((f) => {
      totalNutritions.calories = Number(
        (totalNutritions.calories + (f.nutritions.calories ?? 0)).toFixed(2)
      );
      totalNutritions.protein = Number(
        (totalNutritions.protein + (f.nutritions.protein ?? 0)).toFixed(2)
      );
      totalNutritions.carbs = Number(
        (totalNutritions.carbs + (f.nutritions.carbs ?? 0)).toFixed(2)
      );
      totalNutritions.fat = Number(
        (totalNutritions.fat + (f.nutritions.fat ?? 0)).toFixed(2)
      );
      totalNutritions.fiber = Number(
        (totalNutritions.fiber + (f.nutritions.fiber ?? 0)).toFixed(2)
      );
      totalNutritions.sugar = Number(
        (totalNutritions.sugar + (f.nutritions.sugar ?? 0)).toFixed(2)
      );
    });
    return totalNutritions;
  }

  Lookup(meal: string) {
    this.submitButtonPressed = true;
    this.loading = true;
    if (meal === '') {
      this.mealOptions = [];
      this.loading = false;
      this.noResults = false;
      return;
    }
    this.mealLookupService
      .searchMeals(meal)
      .then((data: IFood[]) => {
        this.mealOptions = data;
        this.mealOptions = data.map((meal: IFood) => {
          return {
            ...meal,
            description: this.formatFoodName(meal.description),
            ingredients: this.formatFoodName(meal.ingredients),
          };
        });
        this.loading = false;
        this.noResults = this.mealOptions.length === 0;
      })
      .catch((error: any) => {
        console.error('Error:', error);
        this.loading = false;
      });
  }

  formatFoodName(name: string): string {
    if (!name) {
      return '';
    }
    return name
      .toLowerCase()
      .split(',')
      .map((word) => word.trim())
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(', ');
  }

  async selectFood(food: IFood) {
    food = await this.mealLookupService.updateNutritions(food);
    this.foodSelected = true;
    this.foodChosen = food;
  }

  addFood(amount: string) {
    console.log(this.foodChosen);
    let food: IFood = {
      fdcID: this.foodChosen.fdcID,
      description: this.foodChosen.description,
      brandName: this.foodChosen.brandName,
      servingSize: Number(amount),
      servingUnit: this.foodChosen.servingUnit,
      packageWeight: this.foodChosen.packageWeight,
      ingredients: this.foodChosen.ingredients,
      nutritions: {
        calories: Number(
          (
            (this.foodChosen.nutritions.calories ?? 0) *
            (Number(amount) / this.foodChosen.servingSize)
          ).toFixed(2)
        ),
        protein: Number(
          (
            (this.foodChosen.nutritions.protein ?? 0) *
            (Number(amount) / this.foodChosen.servingSize)
          ).toFixed(2)
        ),
        carbs: Number(
          (
            (this.foodChosen.nutritions.carbs ?? 0) *
            (Number(amount) / this.foodChosen.servingSize)
          ).toFixed(2)
        ),
        fat: Number(
          (
            (this.foodChosen.nutritions.fat ?? 0) *
            (Number(amount) / this.foodChosen.servingSize)
          ).toFixed(2)
        ),
        fiber: Number(
          (
            (this.foodChosen.nutritions.fiber ?? 0) *
            (Number(amount) / this.foodChosen.servingSize)
          ).toFixed(2)
        ),
        sugar: Number(
          (
            (this.foodChosen.nutritions.sugar ?? 0) *
            (Number(amount) / this.foodChosen.servingSize)
          ).toFixed(2)
        ),
      },
    };
    this.clonedMeal.food.push(food);
    console.log(food);
    this.snackBar.open(food.description + ' was added!', '', {
      duration: 2000,
    });
    this.totalNutritions = this.calculateTotalNutritions(this.foods);
  }

  closeCustomMealDetails() {
    this.dialogRef.close();
  }

  saveCustomMeal() {
    this.customMealService.updateCustomMeal(this.clonedMeal);
    this.dialogRef.close(this.clonedMeal);
  }

  deleteFood(food: IFood) {
    const index = this.clonedMeal.food.indexOf(food);
    if (index > -1) {
      this.clonedMeal.food.splice(index, 1);
    }
    this.totalNutritions = this.calculateTotalNutritions(this.foods);
  }
}
