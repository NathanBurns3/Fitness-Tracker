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
  heightInches: number,
  weightLbs: number
): number {
  const weightKg = weightLbs * 0.45359237;
  const heightCm = heightInches * 2.54;

  const bmr =
    gender === GenderEnum.Male
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  return bmr;
}

function getActivityMultiplier(activityLevel: ActivityLevelEnum): number {
  switch (activityLevel) {
    case ActivityLevelEnum.Sedentary:
      return 1.2;
    case ActivityLevelEnum.Exercise1To3TimesPerWeek:
      return 1.375;
    case ActivityLevelEnum.Exercise4To5TimesPerWeek:
      return 1.55;
    case ActivityLevelEnum.IntenseExercise6To7TimesPerWeek:
      return 1.725;
    default:
      return 1.55;
  }
}

function adjustCaloriesForGoal(calories: number, goal: WeightGoalEnum): number {
  switch (goal) {
    case WeightGoalEnum.ExtremeWeightLoss:
      return calories - 1000;
    case WeightGoalEnum.WeightLoss:
      return calories - 500;
    case WeightGoalEnum.MildWeightLoss:
      return calories - 250;
    case WeightGoalEnum.Maintain:
      return calories;
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
  let proteinPct: number, carbsPct: number, fatPct: number;

  switch (dietPlan) {
    case DietEnum.LowFat:
      proteinPct = 25;
      carbsPct = 55;
      fatPct = 20;
      break;
    case DietEnum.LowCarbs:
      proteinPct = 30;
      carbsPct = 25;
      fatPct = 45;
      break;
    case DietEnum.HighProtein:
      proteinPct = 35;
      carbsPct = 30;
      fatPct = 35;
      break;
    case DietEnum.Balanced:
    default:
      proteinPct = 20;
      carbsPct = 50;
      fatPct = 30;
      break;
  }

  const protein = Math.round((calories * (proteinPct / 100)) / 4);
  const carbs = Math.round((calories * (carbsPct / 100)) / 4);
  const fat = Math.round((calories * (fatPct / 100)) / 9);
  const fiber = Math.round((calories / 1000) * 14);

  return { protein, carbs, fat, fiber, calories: Math.round(calories) };
}

export function calculateMacros(
  age: number,
  gender: GenderEnum,
  heightInches: number,
  weightLbs: number,
  activityLevel: ActivityLevelEnum,
  goal: WeightGoalEnum,
  dietPlan: DietEnum
): Macros {
  const bmr = calculateBMR(age, gender, heightInches, weightLbs);
  const activityMultiplier = getActivityMultiplier(activityLevel);
  const maintenanceCalories = bmr * activityMultiplier;
  const adjustedCalories = adjustCaloriesForGoal(maintenanceCalories, goal);

  return getMacrosFromCalories(adjustedCalories, dietPlan);
}
