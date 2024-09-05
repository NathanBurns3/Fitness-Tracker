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
import { YearlyExercisesService } from '../summaries/yearly/services/yearly-exercise.service';
import { YearlyEatingGoalsService } from '../summaries/yearly/services/yearly-eating-goals.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

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
  yearlyExercisesCompleted!: number[];
  yearlyEatingGoalsCompleted!: number[];
  isLoading: boolean = false;
  private apiCallsCompleted: number = 0;
  private totalApiCalls: number = 4;

  constructor(
    private profileInfoService: ProfileInfoService,
    private dailyEatingInfoService: DailyEatingInfoService,
    private dailyExerciseInfoService: DailyExerciseInfoService,
    private monthlyBreakdownInfoService: MonthlyBreakdownInfoService,
    private monthlyExerciseInfoService: MonthlyExerciseInfoService,
    private yearlyExercisesService: YearlyExercisesService,
    private yearlyEatingGoalsService: YearlyEatingGoalsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.profileInfoService
      .getProfileInfo()
      .subscribe((profileInfo: IProfileInfo) => {
        this.profileInfo = profileInfo;
        this.formattedHeight = this.formatHeight();
        this.checkAllApiCallsCompleted();
      });
    this.getDailyInfo();
    this.getMonthlyInfo();
    this.getYearlyInfo();
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
    forkJoin([
      this.dailyEatingInfoService.getDailyEatingInfo(),
      this.dailyExerciseInfoService.getDailyExerciseInfo(),
    ]).subscribe(
      ([eatingInfo, exerciseInfo]: [IDailyEatingInfo, IExerciseInfo]) => {
        this.dailyEatingInfo = eatingInfo;
        this.dailyExerciseInfo = exerciseInfo;
        this.checkAllApiCallsCompleted();
      }
    );
  }

  getMonthlyInfo(): void {
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
      this.checkAllApiCallsCompleted();
    });
  }

  getYearlyInfo(): void {
    forkJoin([
      this.yearlyExercisesService.getYearlyExercises(),
      this.yearlyEatingGoalsService.getYearlyEatingGoals(),
    ]).subscribe(([exercises, eatingGoals]) => {
      this.yearlyExercisesCompleted = exercises;
      this.yearlyEatingGoalsCompleted = eatingGoals;
      this.checkAllApiCallsCompleted();
    });
  }

  private checkAllApiCallsCompleted(): void {
    this.apiCallsCompleted++;
    if (this.apiCallsCompleted === this.totalApiCalls) {
      this.isLoading = false;
    }
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }
}
