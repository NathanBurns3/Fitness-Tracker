import { Injectable } from '@angular/core';
import { IProfileInfo } from '../models/profile-info';

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
      address: '1234 S 5678 E',
      profileImage: './assets/testProfilePicture.jpg',
      gender: 'Male',
      age: 20,
      height: 72,
      weight: 173,
      goals: ['Maintain Weight', 'Gain Muscle'],
      exerciseStreak: 3,
      eatingGoalStreak: 12,
      eatingGoal: [
        {
          calories: 3200,
          protein: 175,
          carbs: 210,
          fat: 100,
          fiber: 70,
          sodium: 2750,
        },
      ],
    };
  }
}
