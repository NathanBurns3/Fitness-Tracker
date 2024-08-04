import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomMeal } from '../models/custom-meal';
import { IFood } from '../models/food';
import { MealLookupService } from '../search-meals/all-meals/services/meal-lookup.service';
import { CustomMealService } from '../search-meals/custom-meals/services/custom-meals.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertUnit } from 'src/app/helpers/unit-converter';

@Component({
  selector: 'custom-meal-details',
  templateUrl: './custom-meal-details.component.html',
  styleUrls: ['./custom-meal-details.component.css'],
})
export class CustomMealDetailsComponent {
  title: string;
  customFood: ICustomMeal;
  action: string = '';
  totalNutritions: IFood['nutritions'] = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  };
  foods: IFood[] = [];
  mealOptions: IFood[] = [];
  showDropdown = false;
  mealSearch: string = '';
  loading: boolean = false;
  submitButtonPressed: boolean = false;
  foodSelected: boolean = false;
  amount: string = '';
  previousServingSize: number = 0;
  previousServingUnit: string = '';
  maxedFood: boolean = false;
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
    public data: { meal: ICustomMeal; title: string; action: string },
    private mealLookupService: MealLookupService,
    private customMealService: CustomMealService,
    private snackBar: MatSnackBar
  ) {
    this.title = data.title;
    this.customFood = data.meal;
    this.action = data.action;
    this.clonedMeal = JSON.parse(JSON.stringify(this.customFood));
    this.foods = this.clonedMeal.food;
    this.totalNutritions = this.calculateTotalNutritions(this.clonedMeal.food);
    this.previousServingSize = this.customFood.servingSize;
    this.previousServingUnit = this.customFood.servingUnit;
    this.maxedFood = this.foods.length >= 25;
  }

  calculateTotalNutritions(food: IFood[]): IFood['nutritions'] {
    const totalNutritions = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
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
    this.mealLookupService.searchMeals(meal).subscribe({
      next: (data: IFood[]) => {
        this.mealOptions = data.map((meal: IFood) => {
          return {
            ...meal,
            description: this.formatFoodName(meal.description),
            ingredients: this.formatFoodName(meal.ingredients),
          };
        });
        this.loading = false;
        this.noResults = this.mealOptions.length === 0;
      },
      error: () => {
        this.loading = false;
      },
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

  selectFood(food: IFood) {
    this.mealLookupService
      .updateNutritions(food)
      .subscribe((updatedFood: IFood) => {
        this.foodSelected = true;
        this.foodChosen = updatedFood;
        this.mealSearch = updatedFood.description;
      });
  }

  addFood(amount: string) {
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
      },
    };
    this.clonedMeal.food.push(food);
    this.snackBar.open(food.description + ' was added!', '', {
      duration: 2000,
    });
    this.totalNutritions = this.calculateTotalNutritions(this.foods);
    this.updateServingSize(food, 'add');
    this.maxedFood = this.clonedMeal.food.length >= 25;
  }

  closeCustomMealDetails() {
    this.dialogRef.close();
  }

  saveCustomMeal() {
    this.customMealService
      .updateCustomMeal(this.clonedMeal, this.action)
      .subscribe((success) => {
        if (success) {
          this.dialogRef.close(this.clonedMeal);
        }
      });
  }

  deleteFood(food: IFood) {
    const index = this.clonedMeal.food.indexOf(food);
    if (index > -1) {
      this.clonedMeal.food.splice(index, 1);
    }
    this.snackBar.open(food.description + ' was removed!', '', {
      duration: 2000,
    });
    this.totalNutritions = this.calculateTotalNutritions(this.foods);
    this.updateServingSize(food, 'delete');
    this.maxedFood = this.clonedMeal.food.length >= 25;
  }

  preventInvalidCharacters(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }

  checkMaxLengthAddingFood(event: any): void {
    const maxLength = 4;
    let value = Number(event.target.value);
    if (value.toString().length > maxLength) {
      let truncatedValue = Number(value.toString().slice(0, maxLength));
      event.target.value = truncatedValue;
      this.amount = Math.trunc(truncatedValue).toString();
    }
  }

  updateServingSize(food?: IFood, action?: string) {
    let servingSizeChange = 0;
    if (food) {
      const servingSizeDelta =
        food?.servingUnit === this.previousServingUnit
          ? food.servingSize
          : this.convertUnits(food);
      servingSizeChange =
        action === 'add' ? servingSizeDelta : -servingSizeDelta;

      this.clonedMeal.servingSize += servingSizeChange;
      this.previousServingUnit = food.servingUnit;
    } else if (this.clonedMeal.servingUnit != this.previousServingUnit) {
      this.clonedMeal.servingSize = this.convertUnits();
      this.previousServingUnit = this.clonedMeal.servingUnit;
    }
    this.previousServingSize = this.clonedMeal.servingSize;
  }

  convertUnits(food?: IFood): number {
    if (food) {
      return convertUnit(
        food.servingSize,
        food.servingUnit,
        this.clonedMeal.servingUnit
      );
    } else {
      return convertUnit(
        this.previousServingSize,
        this.previousServingUnit,
        this.clonedMeal.servingUnit
      );
    }
  }
}
