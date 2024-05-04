import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../models/user-settings';
import { UserSettingsService } from '../services/user-settings.service';
import { IContactInformation } from '../models/contact-information';
import { IPersonalInformation } from '../models/personal-information';
import { IPhysicalMeasurements } from '../models/physical-measurements';
import { IActivityGoal } from '../models/activity-goals';
import validator from 'validator';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  userSettings!: IUserSettings;
  userSettingsChanged: boolean = false;
  pageValid: boolean = true;
  validEmail: boolean = true;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.userSettings = {
      personalInformation: this.userSettingsService.getPersonalInformation(),
      contactInformation: this.userSettingsService.getContactInformation(),
      physicalMeasurements: this.userSettingsService.getPhysicalMeasurements(),
      activityGoal: this.userSettingsService.getActivityGoal(),
      dietPlan: this.userSettingsService.getDietPlan(),
    };
  }

  updateContactInformation(
    updatedContactInformation: IContactInformation
  ): void {
    this.pageValid =
      this.isInformationValid(updatedContactInformation) &&
      validator.isEmail(updatedContactInformation.email) &&
      validator.isMobilePhone(updatedContactInformation.phoneNumber);
    this.userSettings.contactInformation = updatedContactInformation;
    this.userSettingsChanged = true;
  }

  updatePersonalInformation(
    updatedPersonalInformation: IPersonalInformation
  ): void {
    this.pageValid = this.isInformationValid(updatedPersonalInformation);
    if (
      updatedPersonalInformation.firstName.length > 50 ||
      updatedPersonalInformation.lastName.length > 50 ||
      updatedPersonalInformation.age > 999
    ) {
      this.pageValid = false;
    }
    this.userSettings.personalInformation = updatedPersonalInformation;
    this.userSettingsChanged = true;
  }

  updatePhysicalMeasurements(
    updatedPhysicalMeasurements: IPhysicalMeasurements
  ): void {
    this.pageValid = this.isInformationValid(updatedPhysicalMeasurements);
    if (
      updatedPhysicalMeasurements.height > 119 ||
      updatedPhysicalMeasurements.weight > 999
    ) {
      this.pageValid = false;
    }
    this.userSettings.physicalMeasurements = updatedPhysicalMeasurements;
    this.userSettingsChanged = true;
  }

  updateActivityGoal(updatedActivityGoal: IActivityGoal): void {
    this.userSettings.activityGoal = updatedActivityGoal;
    this.userSettingsChanged = true;
  }

  updateDietSelection(dietSelection: string): void {
    this.userSettings.dietPlan = dietSelection;
    this.userSettingsChanged = true;
  }

  isInformationValid(information: any): boolean {
    for (let key in information) {
      if (information[key] === '' || information[key] === null) {
        return false;
      }
    }
    return true;
  }

  saveSettings(): void {
    this.userSettingsService.updateUserSettings(this.userSettings);
  }

  cancelSettings(): void {
    this.ngOnInit();
  }
}
