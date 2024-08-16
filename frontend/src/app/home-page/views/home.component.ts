import { Component, OnInit } from '@angular/core';
import { IProfileInfo } from '../models/profile-info';
import { ProfileInfoService } from '../services/profile-info.service';
import { WeightGoalEnum } from 'src/app/user-settings/models/weight-goal-enum';
import { forkJoin } from 'rxjs';
import { DailyEatingInfoService } from '../summaries/daily/services/daily-eating-info.service';
import { DailyExerciseInfoService } from '../summaries/daily/services/daily-exercise-info.service';
import { IDailyEatingInfo } from '../summaries/daily/models/daily-eating-info';
import { IExerciseInfo } from '../summaries/daily/models/exercise-info';
import { MonthlyBreakdownInfoService } from '../summaries/monthly/services/monthly-breakdown-info.service';
import { MonthlyExerciseInfoService } from '../summaries/monthly/services/monthly-exercise-info.service';
import { IMonthlyBreakdownInfo } from '../summaries/monthly/models/monthly-breakdown-info';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProfileInfoService],
})
export class HomeComponent implements OnInit {
  profileInfo!: IProfileInfo;
  today = new Date();
  formattedDate: string = `${this.today.toLocaleString('default', {
    month: 'long',
  })} ${this.today.getDate()}, ${this.today.getFullYear()}`;
  selectedSummary: string = 'Daily';
  formattedHeight!: string;
  isSidebarOpen = false;
  weightGoalLabels = {
    [WeightGoalEnum.Maintain]: 'Maintain',
    [WeightGoalEnum.MildWeightLoss]: 'Mild Lose',
    [WeightGoalEnum.WeightLoss]: 'Weight lose',
    [WeightGoalEnum.ExtremeWeightLoss]: 'Extreme Lose',
    [WeightGoalEnum.MildWeightGain]: 'Mild Gain',
    [WeightGoalEnum.WeightGain]: 'Weight Gain',
    [WeightGoalEnum.ExtremeWeightGain]: 'Extreme Gain',
  };
  dailyEatingInfo!: IDailyEatingInfo;
  dailyExerciseInfo!: IExerciseInfo;
  monthlyBreakdownInfo!: IMonthlyBreakdownInfo[];
  monthlyExerciseInfo!: IExerciseInfo;
  isLoading: boolean = false;

  constructor(
    private profileInfoService: ProfileInfoService,
    private dailyEatingInfoService: DailyEatingInfoService,
    private dailyExerciseInfoService: DailyExerciseInfoService,
    private monthlyBreakdownInfoService: MonthlyBreakdownInfoService,
    private monthlyExerciseInfoService: MonthlyExerciseInfoService
  ) {}

  ngOnInit(): void {
    this.profileInfoService
      .getProfileInfo()
      .subscribe((profileInfo: IProfileInfo) => {
        this.profileInfo = profileInfo;
        this.formattedHeight = this.formatHeight();
      });
    this.getDailyInfo();
    this.getMonthlyInfo();
  }

  selectSummary(summary: string) {
    this.selectedSummary = summary;
  }

  formatHeight(): string {
    let heightInInches = this.profileInfo.height;
    let feet = Math.floor(heightInInches / 12);
    let inches = heightInInches % 12;
    return `${feet}' ${inches}"`;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getDailyInfo(): void {
    this.isLoading = true;
    forkJoin([
      this.dailyEatingInfoService.getDailyEatingInfo(),
      this.dailyExerciseInfoService.getDailyExerciseInfo(),
    ]).subscribe(
      ([eatingInfo, exerciseInfo]: [IDailyEatingInfo, IExerciseInfo]) => {
        this.dailyEatingInfo = eatingInfo;
        this.dailyExerciseInfo = exerciseInfo;
        this.isLoading = false;
      }
    );
  }

  getMonthlyInfo(): void {
    this.isLoading = true;
    forkJoin([
      this.monthlyExerciseInfoService.getMonthlyExerciseInfo(),
      this.monthlyBreakdownInfoService.getMonthlyBreakdownInfo(),
    ]).subscribe(([exerciseInfo, goals]) => {
      this.monthlyExerciseInfo = exerciseInfo;

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfWeek = new Date(year, month, 1).getDay();
      const days: IMonthlyBreakdownInfo[] = [];

      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push({ day: null, exerciseGoal: false, eatingGoal: false });
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const goal = goals.find((g) => g.day === day);
        if (goal) {
          days.push(goal);
        } else {
          days.push({ day, exerciseGoal: false, eatingGoal: false });
        }
      }
      this.monthlyBreakdownInfo = days;
      this.isLoading = false;
    });
  }
}
