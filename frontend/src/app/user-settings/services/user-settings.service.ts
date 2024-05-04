import { Injectable } from '@angular/core';
import { IPersonalInformation } from '../models/personal-information';
import { IContactInformation } from '../models/contact-information';
import { IActivityGoal } from '../models/activity-goals';
import { ActivityLevelEnum } from '../models/activity-level-enum';
import { WeightGoalEnum } from '../models/weight-goal-enum';
import { IPhysicalMeasurements } from '../models/physical-measurements';
import { IUserSettings } from '../models/user-settings';
import { DietEnum } from '../models/diet-enum';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  personalInformation: IPersonalInformation = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    age: 21,
    profilePicture: './assets/testProfilePicture.jpg',
  };

  contactInformation: IContactInformation = {
    email: 'testEmail@gmail.com',
    phoneNumber: '123-456-7890',
  };

  physicalMeasurements: IPhysicalMeasurements = {
    height: 75,
    weight: 180,
  };

  activityGoal: IActivityGoal = {
    Activity: ActivityLevelEnum.Sedentary,
    WeightGoal: WeightGoalEnum.WeightLoss,
  };

  dietPlan: string = DietEnum.Balanced;

  updateUserSettings(userSettings: IUserSettings): void {
    this.personalInformation = userSettings.personalInformation;
    this.contactInformation = userSettings.contactInformation;
    this.physicalMeasurements = userSettings.physicalMeasurements;
    this.activityGoal = userSettings.activityGoal;
    this.dietPlan = userSettings.dietPlan;
  }

  getPersonalInformation(): IPersonalInformation {
    return this.personalInformation;
  }

  getContactInformation(): IContactInformation {
    return this.contactInformation;
  }

  getPhysicalMeasurements() {
    return this.physicalMeasurements;
  }

  getActivityGoal() {
    return this.activityGoal;
  }

  getDietPlan() {
    return this.dietPlan;
  }
}
