import { Injectable } from '@angular/core';
import { IExerciseInfo } from '../models/exercise-info';

@Injectable({
  providedIn: 'root',
})
export class DailyExerciseInfoService {
  getDailyExerciseInfo(): IExerciseInfo {
    return {
      chestSets: 1,
      calveSets: 2,
      hamstringSets: 3,
      quadSets: 4,
      gluteSets: 2,
      shoulderSets: 3,
      tricepSets: 2,
      forearmSets: 5,
      bicepSets: 1,
      backSets: 4,
      abSets: 1,
    };
  }
}
