import { Component, OnInit } from '@angular/core';
import { IDailyEatingInfo } from '../models/daily-eating-info';
import { IExerciseInfo } from '../models/exercise-info';
import { IProfileInfo } from 'src/app/home/models/profile-info';
import { DailyEatingInfoService } from '../services/daily-eating-info.service';
import { DailyExerciseInfoService } from '../services/daily-exercise-info.service';
import { ProfileInfoService } from 'src/app/home/services/profile-info.service';

@Component({
  selector: 'DailySummaryComponent',
  templateUrl: './daily-summary.component.html',
})
export class DailySummaryComponent implements OnInit {
  dailyEatingInfo!: IDailyEatingInfo;
  dailyExerciseInfo!: IExerciseInfo;
  profileInfo!: IProfileInfo;
  exercisePercentage!: number[];
  eatingPercentage!: number[];
  colors: string[] = [
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-pink-500',
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
  macros: string[] = ['Calories', 'Protein', 'Carbs', 'Fat', 'Fiber', 'Sodium'];

  constructor(
    private dailyEatingInfoService: DailyEatingInfoService,
    private dailyExerciseInfoService: DailyExerciseInfoService,
    private profileInfoService: ProfileInfoService
  ) {}

  ngOnInit(): void {
    this.dailyEatingInfo = this.dailyEatingInfoService.getDailyEatingInfo();
    this.dailyExerciseInfo =
      this.dailyExerciseInfoService.getDailyExerciseInfo();
    this.profileInfo = this.profileInfoService.getProfileInfo();
    this.exercisePercentage = this.getExercisePercentage();
    this.eatingPercentage = this.getEatingPercentage();
  }

  getExercisePercentage(): number[] {
    const percentages: number[] = [];
    const exerciseInfo = Object.values(this.dailyExerciseInfo);
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

  getEatingPercentage(): number[] {
    const percentages: number[] = [];
    const eatingInfo = Object.values(this.dailyEatingInfo);
    const eatingGoals = Object.values(this.profileInfo.eatingGoal[0]);
    const eatingInfoLength = eatingInfo.length;
    for (let i = 0; i < eatingInfoLength; i++) {
      const percentage = Math.round((eatingInfo[i] / eatingGoals[i]) * 100);
      if (percentage !== 0) {
        percentages.push(percentage);
      }
    }
    return percentages;
  }
}
