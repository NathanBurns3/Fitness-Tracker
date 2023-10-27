import { Injectable } from '@angular/core';
import { IExerciseInfo } from '../../daily/models/exercise-info';

@Injectable({
  providedIn: 'root',
})
export class MonthlyExerciseInfoService {
  getMonthlyExerciseInfo(): IExerciseInfo {
    return {
      chestSets: 30,
      calvesSets: 13,
      hamstringSets: 11,
      quadSets: 20,
      gluteSets: 11,
      shoulderSets: 15,
      tricepSets: 12,
      forearmsSets: 13,
      bicepSets: 7,
      backSets: 16,
      absSets: 19,
      totalSets: 119,
    };
  }
}
