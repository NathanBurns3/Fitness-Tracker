import { Component, HostListener, OnInit } from '@angular/core';
import { IUserSettings } from '../models/user-settings';
import { UserSettingsService } from '../services/user-settings.service';
import { IContactInformation } from '../models/contact-information';
import { IPersonalInformation } from '../models/personal-information';
import { IPhysicalMeasurements } from '../models/physical-measurements';
import { IActivityGoal } from '../models/activity-goals';
import validator from 'validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DietEnum } from '../models/diet-enum';

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
  mobile: boolean = window.innerWidth < 700;
  isLoading: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobile = window.innerWidth < 700;
  }

  constructor(
    private userSettingsService: UserSettingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userSettingsService.getUserSettings().subscribe((userSettings) => {
      this.userSettings = userSettings;
      this.isLoading = false;
    });
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
    this.userSettings.dietPlan = dietSelection as DietEnum;
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
    this.isLoading = true;
    this.userSettingsService
      .updateUserSettings(this.userSettings)
      .subscribe((response) => {
        if (response) {
          this.userSettingsChanged = false;
        }
        this.isLoading = false;
      });
  }

  cancelSettings(): void {
    this.ngOnInit();
    this.userSettingsChanged = false;
    this.snackBar.open('Your changes were canceled!', '', {
      duration: 2000,
    });
  }
}
