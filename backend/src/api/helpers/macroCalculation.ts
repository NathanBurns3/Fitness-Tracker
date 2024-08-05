import { ActivityLevelEnum } from '../models/api/settings/activity-level-enum';
import { DietEnum } from '../models/api/settings/diet-enum';
import { GenderEnum } from '../models/api/settings/gender-enum';
import { WeightGoalEnum } from '../models/api/settings/weight-goal-enum';

interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  calories: number;
}

function calculateBMR(
  age: number,
  gender: GenderEnum,
  height: number,
  weight: number
): number {
  if (gender === GenderEnum.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function adjustCaloriesForGoal(calories: number, goal: WeightGoalEnum): number {
  switch (goal) {
    case WeightGoalEnum.MildWeightLoss:
      return calories - 250;
    case WeightGoalEnum.WeightLoss:
      return calories - 500;
    case WeightGoalEnum.ExtremeWeightLoss:
      return calories - 1000;
    case WeightGoalEnum.MildWeightGain:
      return calories + 250;
    case WeightGoalEnum.WeightGain:
      return calories + 500;
    case WeightGoalEnum.ExtremeWeightGain:
      return calories + 1000;
    default:
      return calories;
  }
}

function getMacrosFromCalories(calories: number, dietPlan: DietEnum): Macros {
  let proteinPercentage: number, carbsPercentage: number, fatPercentage: number;

  switch (dietPlan) {
    case DietEnum.LowFat:
      proteinPercentage = 30;
      carbsPercentage = 50;
      fatPercentage = 20;
      break;
    case DietEnum.LowCarbs:
      proteinPercentage = 40;
      carbsPercentage = 30;
      fatPercentage = 30;
      break;
    case DietEnum.HighProtein:
      proteinPercentage = 50;
      carbsPercentage = 30;
      fatPercentage = 20;
      break;
    case DietEnum.Balanced:
    default:
      proteinPercentage = 30;
      carbsPercentage = 40;
      fatPercentage = 30;
      break;
  }

  const protein = (calories * (proteinPercentage / 100)) / 4;
  const carbs = (calories * (carbsPercentage / 100)) / 4;
  const fat = (calories * (fatPercentage / 100)) / 9;
  const fiber = carbs / 10;

  return {
    protein,
    carbs,
    fat,
    fiber,
    calories,
  };
}

export function calculateMacros(
  age: number,
  gender: GenderEnum,
  height: number,
  weight: number,
  activityLevel: ActivityLevelEnum,
  goal: WeightGoalEnum,
  dietPlan: DietEnum
): Macros {
  const bmr = calculateBMR(age, gender, height, weight);
  const maintenanceCalories = bmr * activityLevel;
  const adjustedCalories = adjustCaloriesForGoal(maintenanceCalories, goal);
  return getMacrosFromCalories(adjustedCalories, dietPlan);
}
