import { Injectable } from '@angular/core';
import { IExerciseInfo } from '../models/exercise-info';

@Injectable({
  providedIn: 'root',
})
export class DailyExerciseInfoService {
  getDailyExerciseInfo(): IExerciseInfo {
    return {
      chestSets: 3,
      legSets: 2,
      shoulderSets: 1,
      tricepSets: 1,
      bicepSets: 1,
      backSets: 1,
      absSets: 1,
      totalSets: 10,
    };
  }
}
