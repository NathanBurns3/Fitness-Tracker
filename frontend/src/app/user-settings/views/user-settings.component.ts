import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../models/user-settings';
import { UserSettingsService } from '../services/user-settings.service';
import { IContactInformation } from '../models/contact-information';
import { IPersonalInformation } from '../models/personal-information';
import { IPhysicalMeasurements } from '../models/physical-measurements';
import { IActivityGoal } from '../models/activity-goals';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  userSettings!: IUserSettings;
  userSettingsChanged: boolean = false;
  pageValid: boolean = true;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.userSettings = {
      personalInformation: this.userSettingsService.getPersonalInformation(),
      contactInformation: this.userSettingsService.getContactInformation(),
      physicalMeasurements: this.userSettingsService.getPhysicalMeasurements(),
      activityGoal: this.userSettingsService.getActivityGoal(),
    };
  }

  updateContactInformation(
    updatedContactInformation: IContactInformation
  ): void {
    this.pageValid = this.isInformationValid(updatedContactInformation);
    this.userSettings.contactInformation = updatedContactInformation;
    this.userSettingsChanged = true;
  }

  updatePersonalInformation(
    updatedPersonalInformation: IPersonalInformation
  ): void {
    this.pageValid = this.isInformationValid(updatedPersonalInformation);
    this.userSettings.personalInformation = updatedPersonalInformation;
    this.userSettingsChanged = true;
  }

  updatePhysicalMeasurements(
    updatedPhysicalMeasurements: IPhysicalMeasurements
  ): void {
    this.pageValid = this.isInformationValid(updatedPhysicalMeasurements);
    this.userSettings.physicalMeasurements = updatedPhysicalMeasurements;
    this.userSettingsChanged = true;
  }

  updateActivityGoal(updatedActivityGoal: IActivityGoal): void {
    this.userSettings.activityGoal = updatedActivityGoal;
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
