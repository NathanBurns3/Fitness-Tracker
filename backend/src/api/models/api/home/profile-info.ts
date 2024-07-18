import { WeightGoalEnum } from '../settings/weight-goal-enum';

export interface IProfileInfo {
  firstName: string;
  lastName: string;
  profileImage: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  goal: WeightGoalEnum;
  exerciseStreak: number;
  eatingGoalStreak: number;
}
