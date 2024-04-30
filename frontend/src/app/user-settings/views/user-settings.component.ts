import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../models/user-settings';
import { UserSettingsService } from '../services/user-settings.service';
import { IContactInformation } from '../models/contact-information';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  userSettings!: IUserSettings;

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
    this.userSettings.contactInformation = updatedContactInformation;
  }

  saveSettings(): void {
    this.userSettingsService.updateUserSettings(this.userSettings);
  }

  cancelSettings(): void {
    this.ngOnInit();
  }
}
