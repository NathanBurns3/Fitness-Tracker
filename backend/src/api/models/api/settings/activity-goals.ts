import { ActivityLevelEnum } from '../settings/activity-level-enum';
import { WeightGoalEnum } from '../settings/weight-goal-enum';

export interface IActivityGoal {
  Activity: ActivityLevelEnum;
  WeightGoal: WeightGoalEnum;
}
