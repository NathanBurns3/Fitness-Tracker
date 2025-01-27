import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ActivityLevelEnum } from '../models/activity-level-enum';
import { WeightGoalEnum } from '../models/weight-goal-enum';
import { IActivityGoal } from '../models/activity-goals';

@Component({
    selector: 'activity-goal',
    templateUrl: './activity-goal.component.html',
    styleUrls: ['./activity-goal.component.css'],
    standalone: false
})
export class ActivityGoalComponent implements OnInit, OnChanges {
  @Input() originalActivityGoal!: IActivityGoal;
  @Output() activityGoalChange = new EventEmitter<IActivityGoal>();

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

  ngOnInit(): void {
    this.activityGoal = { ...this.originalActivityGoal };
    this.selectedActivityLevel = this.activityGoal.Activity;
    this.selectedWeightGoal = this.activityGoal.WeightGoal;
  }

  ngOnChanges(): void {
    this.activityGoal = { ...this.originalActivityGoal };
    this.selectedActivityLevel = this.activityGoal.Activity;
    this.selectedWeightGoal = this.activityGoal.WeightGoal;
  }

  updateActivityGoal(): void {
    this.activityGoal.Activity = this.selectedActivityLevel;
    this.activityGoal.WeightGoal = this.selectedWeightGoal;
    this.activityGoalChange.emit(this.activityGoal);
  }
}
