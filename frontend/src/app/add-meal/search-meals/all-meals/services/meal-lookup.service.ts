import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DailyFoodService } from 'src/app/add-meal/meal-list/services/daily-food.service';
import { IFood, Nutrient_Ids } from 'src/app/add-meal/models/food';
@Injectable({
  providedIn: 'root',
})
export class MealLookupService {
  private clientID: string = 'FOOD API KEY HERE';
  meals: IFood[] = [];

  constructor(
    private http: HttpClient,
    private dailyFoodService: DailyFoodService,
    private snackBar: MatSnackBar
  ) {}

  searchMeals(meal: string) {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.clientID}&query=${meal}&pageSize=10&requireAllWords=true`;
    return this.http
      .get(url)
      .toPromise()
      .then((data: any) => this.formatData(data));
  }

  private formatData(data: any): IFood[] {
    this.meals = [];
    let foods = data.foods;
    for (let food of foods) {
      let nutrients: { [key: number]: any } = {};
      for (let nutrient of food.foodNutrients) {
        nutrients[nutrient.nutrientId] = nutrient.value;
      }
      let meal: IFood = {
        fdcID: food.fdcId,
        description: food.description,
        brandName: food.brandName,
        servingSize: food.servingSize,
        servingUnit: food.servingSizeUnit,
        packageWeight: food.packageWeight,
        ingredients: food.ingredients,
        nutritions: {
          calories: nutrients[Nutrient_Ids.Energy],
          protein: nutrients[Nutrient_Ids.Protein],
          carbs: nutrients[Nutrient_Ids.Carbs],
          fat: nutrients[Nutrient_Ids.Fat],
          fiber: nutrients[Nutrient_Ids.Fiber],
        },
      };
      this.meals.push(meal);
    }
    return this.meals;
  }

  async updateNutritions(meal: IFood): Promise<IFood> {
    const url = `https://api.nal.usda.gov/fdc/v1/foods?api_key=${this.clientID}&fdcIds=${meal.fdcID}`;
    const data: any = await this.http.get(url).toPromise();
    this.formatNutritions(data, meal);
    return meal;
  }

  formatNutritions(data: any, meal: IFood) {
    meal.nutritions = {
      calories: data[0].labelNutrients.calories
        ? Math.ceil(data[0].labelNutrients.calories.value)
        : 0,
      protein: data[0].labelNutrients.protein
        ? Math.ceil(data[0].labelNutrients.protein.value)
        : 0,
      carbs: data[0].labelNutrients.carbohydrates
        ? Math.ceil(data[0].labelNutrients.carbohydrates.value)
        : 0,
      fat: data[0].labelNutrients.fat
        ? Math.ceil(data[0].labelNutrients.fat.value)
        : 0,
      fiber: data[0].labelNutrients.fiber
        ? Math.ceil(data[0].labelNutrients.fiber.value)
        : 0,
    };
  }

  addMeal(meal: IFood): void {
    this.dailyFoodService.addFood(meal);
    this.meals.push(meal);
  }
}
