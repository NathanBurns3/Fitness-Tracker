import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFood, Nutrient_Ids } from 'src/app/add-meal/models/food';
@Injectable({
  providedIn: 'root',
})
export class MealLookupService {
  private clientID: string = 'FOOD API KEY HERE';
  meals: IFood[] = [];

  constructor(private http: HttpClient) {}
  searchMeals(meal: string) {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.clientID}&query=${meal}&pageSize=10&requireAllWords=true`;
    return this.http
      .get(url)
      .toPromise()
      .then((data: any) => this.formatData(data));
  }

  private formatData(data: any) {
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
          sodium: nutrients[Nutrient_Ids.Sodium],
        },
      };
      this.meals.push(meal);
    }
    return this.meals;
  }
}
