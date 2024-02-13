import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YearlyExercisesService {
  getYearlyExercises(): number[] {
    return [30, 20, 15, 12, 7, 16, 19, 20, 15, 11, 25, 30];
  }
}
