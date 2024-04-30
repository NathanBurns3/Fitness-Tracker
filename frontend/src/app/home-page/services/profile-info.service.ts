import { Injectable } from '@angular/core';
import { IProfileInfo } from '../models/profile-info';
import { WeightGoalEnum } from 'src/app/user-settings/models/weight-goal-enum';

@Injectable({
  providedIn: 'root',
})
export class ProfileInfoService {
  getProfileInfo(): IProfileInfo {
    return {
      firstName: 'Nathan',
      lastName: 'Burns',
      email: 'nate10nate@gmail.com',
      phone: '801-616-1234',
      profileImage: './assets/testProfilePicture.jpg',
      gender: 'Male',
      age: 20,
      height: 72,
      weight: 173,
      goal: WeightGoalEnum.Maintain,
      exerciseStreak: 3,
      eatingGoalStreak: 12,
    };
  }
}
