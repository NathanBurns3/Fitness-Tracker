import { Injectable } from '@angular/core';
import { IDailyEatingInfo } from '../models/daily-eating-info';

@Injectable({
  providedIn: 'root',
})
export class DailyEatingInfoService {
  getDailyEatingInfo(): IDailyEatingInfo {
    return {
      calories: 4000,
      protein: 150,
      carbs: 200,
      fat: 50,
      fiber: 30,
      sodium: 2300,
    };
  }
}
