import { Component, OnInit } from '@angular/core';
import { IProfileInfo } from '../models/profile-info';
import { ProfileInfoService } from '../services/profile-info.service';
import { WeightGoalEnum } from 'src/app/user-settings/models/weight-goal-enum';

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
  hideHome = false;
  weightGoalLabels = {
    [WeightGoalEnum.Maintain]: 'Maintain',
    [WeightGoalEnum.MildWeightLoss]: 'Mild Lose',
    [WeightGoalEnum.WeightLoss]: 'Weight lose',
    [WeightGoalEnum.ExtremeWeightLoss]: 'Extreme Lose',
    [WeightGoalEnum.MildWeightGain]: 'Mild Gain',
    [WeightGoalEnum.WeightGain]: 'Weight Gain',
    [WeightGoalEnum.ExtremeWeightGain]: 'Extreme Gain',
  };

  constructor(private profileInfoService: ProfileInfoService) {}

  ngOnInit(): void {
    this.profileInfoService
      .getProfileInfo()
      .subscribe((profileInfo: IProfileInfo) => {
        this.profileInfo = profileInfo;
        this.formattedHeight = this.formatHeight();
      });
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

  toggleHome() {
    this.hideHome = !this.hideHome;
  }
}
