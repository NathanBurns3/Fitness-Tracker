import { Component, OnInit } from '@angular/core';
import { ActivityLevelEnum } from '../models/activity-level-enum';
import { WeightGoalEnum } from '../models/weight-goal-enum';
import { IActivityGoal } from '../models/activity-goals';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'activity-goal',
  templateUrl: './activity-goal.component.html',
})
export class ActivityGoalComponent implements OnInit {
  activityLevelLabels = {
    [ActivityLevelEnum.Sedentary]: 'None',
    [ActivityLevelEnum.Exercise1To3TimesPerWeek]: '1-3 Days a week',
    [ActivityLevelEnum.Exercise4To5TimesPerWeek]: '3-5 Days a week',
    [ActivityLevelEnum.IntenseExercise6To7TimesPerWeek]: '6-7 days a week',
  };
  weightGoalLabels = {
    [WeightGoalEnum.Maintain]: 'Maintain',
    [WeightGoalEnum.MildWeightLoss]: 'Mild Lose',
    [WeightGoalEnum.WeightLoss]: 'Weight lose',
    [WeightGoalEnum.ExtremeWeightLoss]: 'Extreme Lose',
    [WeightGoalEnum.MildWeightGain]: 'Mild Gain',
    [WeightGoalEnum.WeightGain]: 'Weight Gain',
    [WeightGoalEnum.ExtremeWeightGain]: 'Extreme Gain',
  };
  selectedActivityLevel!: ActivityLevelEnum;
  selectedWeightGoal!: WeightGoalEnum;

  activityGoal!: IActivityGoal;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.activityGoal = {
      ...this.userSettingsService.getActivityGoal(),
    };
    this.selectedActivityLevel = this.activityGoal.Activity;
    this.selectedWeightGoal = this.activityGoal.WeightGoal;
  }
}
