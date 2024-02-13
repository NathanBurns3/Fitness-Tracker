export interface IDailyEatingInfo {
  goals: {
    caloriesGoal: number;
    proteinGoal: number;
    carbsGoal: number;
    fatGoal: number;
    fiberGoal: number;
    sodiumGoal: number;
  };
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
}
