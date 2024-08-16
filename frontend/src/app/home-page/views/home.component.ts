import { Component, OnInit } from '@angular/core';
import { IProfileInfo } from '../models/profile-info';
import { ProfileInfoService } from '../services/profile-info.service';
import { WeightGoalEnum } from 'src/app/user-settings/models/weight-goal-enum';
import { forkJoin } from 'rxjs';
import { DailyEatingInfoService } from '../summaries/daily/services/daily-eating-info.service';
import { DailyExerciseInfoService } from '../summaries/daily/services/daily-exercise-info.service';
import { IDailyEatingInfo } from '../summaries/daily/models/daily-eating-info';
import { IExerciseInfo } from '../summaries/daily/models/exercise-info';

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
  isLoading: boolean = false;

  constructor(
    private profileInfoService: ProfileInfoService,
    private dailyEatingInfoService: DailyEatingInfoService,
    private dailyExerciseInfoService: DailyExerciseInfoService
  ) {}

  ngOnInit(): void {
    this.profileInfoService
      .getProfileInfo()
      .subscribe((profileInfo: IProfileInfo) => {
        this.profileInfo = profileInfo;
        this.formattedHeight = this.formatHeight();
      });
    this.getDailyInfo();
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
        console.log('eating', this.dailyEatingInfo);
        console.log('exercise', this.dailyExerciseInfo);
      }
    );
  }
}
