import { Component, OnInit } from '@angular/core';
import { IMonthlyBreakdownInfo } from '../models/monthly-breakdown-info';
import { MonthlyBreakdownInfoService } from '../services/monthly-breakdown-info.service';
import { IExerciseInfo } from '../../daily/models/exercise-info';
import { MonthlyExerciseInfoService } from '../services/monthly-exercise-info.service';

@Component({
  selector: 'MonthlySummaryComponent',
  templateUrl: './monthly-summary.component.html',
})
export class MonthlySummaryComponent implements OnInit {
  monthlyBreakdownInfo!: IMonthlyBreakdownInfo[];
  monthlyExerciseInfo!: IExerciseInfo;
  exercisePercentage!: number[];
  colors: string[] = [
    'bg-red-400',
    'bg-blue-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-orange-400',
    'bg-green-400',
    'bg-pink-400',
  ];
  exercises: string[] = [
    'Chest',
    'Legs',
    'Shoulders',
    'Triceps',
    'Biceps',
    'Back',
    'Abs',
  ];
  date = new Date();
  currentMonthYear = this.date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  constructor(
    private monthlyBreakdownInfoService: MonthlyBreakdownInfoService,
    private monthlyExerciseInfoService: MonthlyExerciseInfoService
  ) {}

  ngOnInit(): void {
    this.monthlyBreakdownInfo =
      this.monthlyBreakdownInfoService.getMonthlyBreakdownInfo();
    this.monthlyExerciseInfo =
      this.monthlyExerciseInfoService.getMonthlyExerciseInfo();
    this.exercisePercentage = this.getExercisePercentage();
  }

  getExercisePercentage(): number[] {
    const percentages: number[] = [];
    const exerciseInfo = Object.values(this.monthlyExerciseInfo);
    const exerciseInfoLength = exerciseInfo.length - 1;
    const totalSets = exerciseInfo[exerciseInfoLength];
    for (let i = 0; i < exerciseInfoLength; i++) {
      const percentage = Math.round((exerciseInfo[i] / totalSets) * 100);
      if (percentage !== 0) {
        percentages.push(percentage);
      }
    }
    return percentages;
  }
}
