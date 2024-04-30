import { Injectable } from '@angular/core';
import { IPersonalInformation } from '../models/personal-information';
import { IContactInformation } from '../models/contact-information';
import { IActivityGoal } from '../models/activity-goals';
import { ActivityLevelEnum } from '../models/activity-level-enum';
import { WeightGoalEnum } from '../models/weight-goal-enum';
import { IPhysicalMeasurements } from '../models/physical-measurements';

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

  getPersonalInformation(): IPersonalInformation {
    return this.personalInformation;
  }

  updatePersonalInformation(personalInformation: IPersonalInformation): void {
    this.personalInformation = personalInformation;
  }

  getContactInformation(): IContactInformation {
    return this.contactInformation;
  }

  updateContactInformation(contactInformation: IContactInformation): void {
    this.contactInformation = contactInformation;
  }

  getPhysicalMeasurements() {
    return this.physicalMeasurements;
  }

  updatePhysicalMeasurements(physicalMeasurements: IPhysicalMeasurements) {
    this.physicalMeasurements = physicalMeasurements;
  }

  getActivityGoal() {
    return this.activityGoal;
  }

  updateActivityGoal(activityGoal: IActivityGoal) {
    this.activityGoal = activityGoal;
  }
}
