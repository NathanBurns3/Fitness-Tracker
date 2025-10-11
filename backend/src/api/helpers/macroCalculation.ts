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

  return Math.round(bmr);
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
      return Math.round(calories * 0.8);
    case WeightGoalEnum.WeightLoss:
      return Math.round(calories * 0.9);
    case WeightGoalEnum.MildWeightLoss:
      return Math.round(calories * 0.95);
    case WeightGoalEnum.Maintain:
      return Math.round(calories);
    case WeightGoalEnum.MildWeightGain:
      return Math.round(calories * 1.05);
    case WeightGoalEnum.WeightGain:
      return Math.round(calories * 1.1);
    case WeightGoalEnum.ExtremeWeightGain:
      return Math.round(calories * 1.2);
    default:
      return Math.round(calories);
  }
}

function getMacrosFromCalories(calories: number, dietPlan: DietEnum): Macros {
  let proteinPct = 30,
    carbsPct = 40,
    fatPct = 30;

  switch (dietPlan) {
    case DietEnum.LowFat:
      [proteinPct, carbsPct, fatPct] = [30, 50, 20];
      break;
    case DietEnum.LowCarbs:
      [proteinPct, carbsPct, fatPct] = [40, 30, 30];
      break;
    case DietEnum.HighProtein:
      [proteinPct, carbsPct, fatPct] = [35, 35, 30];
      break;
    default:
      [proteinPct, carbsPct, fatPct] = [30, 40, 30];
  }

  const protein = Math.round((calories * (proteinPct / 100)) / 4);
  const carbs = Math.round((calories * (carbsPct / 100)) / 4);
  const fat = Math.round((calories * (fatPct / 100)) / 9);
  const fiber = Math.round((calories / 1000) * 14);

  return { protein, carbs, fat, fiber, calories };
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
  const tdee = Math.round(bmr * getActivityMultiplier(activityLevel));
  const adjusted = adjustCaloriesForGoal(tdee, goal);
  return getMacrosFromCalories(adjusted, dietPlan);
}
