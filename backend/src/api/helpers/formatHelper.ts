import { IFood, Nutrient_Ids } from '../models/api/meals/food';

export const formatMealData = (data: any): IFood[] => {
  let meals: IFood[] = [];
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
    meals.push(meal);
  }
  return meals;
};

export const formatFoodNutritions = (data: any, meal: IFood) => {
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
};
