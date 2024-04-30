import { ActivityLevelEnum } from './activity-level-enum';
import { WeightGoalEnum } from './weight-goal-enum';

export interface IActivityGoal {
  Activity: ActivityLevelEnum;
  WeightGoal: WeightGoalEnum;
}
