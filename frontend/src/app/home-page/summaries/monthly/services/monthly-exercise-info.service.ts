import { Injectable } from '@angular/core';
import { IExerciseInfo } from '../../daily/models/exercise-info';

@Injectable({
  providedIn: 'root',
})
export class MonthlyExerciseInfoService {
  getMonthlyExerciseInfo(): IExerciseInfo {
    return {
      chestSets: 30,
      calveSets: 13,
      hamstringSets: 11,
      quadSets: 20,
      gluteSets: 11,
      shoulderSets: 15,
      tricepSets: 12,
      forearmSets: 13,
      bicepSets: 7,
      backSets: 16,
      abSets: 19,
    };
  }
}
