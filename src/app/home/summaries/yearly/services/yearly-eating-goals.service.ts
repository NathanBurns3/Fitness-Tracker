import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YearlyEatingGoalsService {
  getYearlyEatingGoals(): number[] {
    return [20, 25, 17, 11, 9, 5, 23, 13, 19, 15, 9, 27];
  }
}
