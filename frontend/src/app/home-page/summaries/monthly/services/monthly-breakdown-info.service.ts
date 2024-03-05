import { Injectable } from '@angular/core';
import { IMonthlyBreakdownInfo } from '../models/monthly-breakdown-info';
@Injectable({
  providedIn: 'root',
})
export class MonthlyBreakdownInfoService {
  getMonthlyBreakdownInfo(): IMonthlyBreakdownInfo[] {
    return [
      { day: 1, exerciseGoal: true, eatingGoal: false },
      { day: 2, exerciseGoal: false, eatingGoal: true },
      { day: 3, exerciseGoal: false, eatingGoal: false },
      { day: 4, exerciseGoal: true, eatingGoal: false },
      { day: 5, exerciseGoal: false, eatingGoal: true },
      { day: 6, exerciseGoal: false, eatingGoal: true },
      { day: 7, exerciseGoal: true, eatingGoal: false },
      { day: 8, exerciseGoal: true, eatingGoal: true },
      { day: 9, exerciseGoal: false, eatingGoal: false },
      { day: 10, exerciseGoal: true, eatingGoal: false },
      { day: 11, exerciseGoal: false, eatingGoal: false },
      { day: 12, exerciseGoal: false, eatingGoal: true },
      { day: 13, exerciseGoal: false, eatingGoal: true },
      { day: 14, exerciseGoal: false, eatingGoal: false },
      { day: 15, exerciseGoal: true, eatingGoal: true },
      { day: 16, exerciseGoal: true, eatingGoal: true },
      { day: 17, exerciseGoal: false, eatingGoal: false },
      { day: 18, exerciseGoal: false, eatingGoal: false },
    ];
  }
}
