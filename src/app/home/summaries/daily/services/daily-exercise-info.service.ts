import { Injectable } from '@angular/core';
import { IExerciseInfo } from '../models/exercise-info';

@Injectable({
  providedIn: 'root',
})
export class DailyExerciseInfoService {
  getDailyExerciseInfo(): IExerciseInfo {
    return {
      chestSets: 3,
      calvesSets: 3,
      hamstringSets: 1,
      quadSets: 2,
      gluteSets: 1,
      shoulderSets: 1,
      tricepSets: 1,
      forearmsSets: 2,
      bicepSets: 1,
      backSets: 1,
      absSets: 1,
      totalSets: 10,
    };
  }
}
