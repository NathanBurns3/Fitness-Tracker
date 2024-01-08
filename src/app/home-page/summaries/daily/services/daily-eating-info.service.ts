import { Injectable } from '@angular/core';
import { IDailyEatingInfo } from '../models/daily-eating-info';

@Injectable({
  providedIn: 'root',
})
export class DailyEatingInfoService {
  getDailyEatingInfo(): IDailyEatingInfo {
    return {
      goals: {
        caloriesGoal: 3200,
        proteinGoal: 175,
        carbsGoal: 210,
        fatGoal: 100,
        fiberGoal: 70,
        sodiumGoal: 2750,
      },
      totals: {
        calories: 4000,
        protein: 150,
        carbs: 200,
        fat: 50,
        fiber: 30,
        sodium: 2300,
      },
    };
  }
}
