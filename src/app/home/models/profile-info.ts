import { IDailyEatingInfo } from '../summaries/daily/models/daily-eating-info';

export interface IProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  goals: string[];
  exerciseStreak: number;
  eatingGoalStreak: number;
  eatingGoal: IDailyEatingInfo[];
}
