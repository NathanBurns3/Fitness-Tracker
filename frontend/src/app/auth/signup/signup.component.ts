import {
  Component,
  HostListener,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUserSettings } from 'src/app/user-settings/models/user-settings';
import { GenderEnum } from 'src/app/user-settings/models/gender-enum';
import { ActivityLevelEnum } from 'src/app/user-settings/models/activity-level-enum';
import { WeightGoalEnum } from 'src/app/user-settings/models/weight-goal-enum';
import { DietEnum } from 'src/app/user-settings/models/diet-enum';
import * as validator from 'validator';
import { IPersonalInformation } from 'src/app/user-settings/models/personal-information';
import { IContactInformation } from 'src/app/user-settings/models/contact-information';
import { IPhysicalMeasurements } from 'src/app/user-settings/models/physical-measurements';
import { IActivityGoal } from 'src/app/user-settings/models/activity-goals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  userSettings: IUserSettings;
  password = '';
  confirmPassword = '';
  mobile: boolean = window.innerWidth < 700;
  pageValid: boolean = true;
  userSettingsChanged: boolean = false;
  passwordSet: boolean = false;
  captchaToken: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.userSettings = {
      personalInformation: {
        firstName: 'Your First Name',
        lastName: 'Your Last Name',
        gender: GenderEnum.Other,
        age: 1,
        profilePicture: 'assets/default-profile-image.jpg',
      },
      contactInformation: {
        email: 'Your Email',
        phoneNumber: 'Your Phone Number',
      },
      physicalMeasurements: {
        height: 1,
        weight: 1,
      },
      activityGoal: {
        Activity: ActivityLevelEnum.Sedentary,
        WeightGoal: WeightGoalEnum.ExtremeWeightGain,
      },
      dietPlan: DietEnum.LowFat,
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobile = window.innerWidth < 700;
  }

  signup() {
    this.recaptchaV3Service.execute('signup').subscribe({
      next: (token: string) => {
        this.captchaToken = token;
        const encodedPassword = btoa(this.password);
        this.authService
          .signup(this.userSettings, encodedPassword, this.captchaToken)
          .subscribe(
            () => {
              this.router.navigate(['/login']);
            },
            (error) => {
              if (error.status === 409) {
                this.snackBar.open(
                  'An account with that email already exists',
                  'Close',
                  { duration: 3000 }
                );
                this.router.navigate(['/login']);
              } else if (error.error && error.error.message) {
                this.snackBar.open(error.error.message, 'Close', {
                  duration: 3000,
                });
              } else {
                this.snackBar.open(
                  'Signup failed. Please try again.',
                  'Close',
                  { duration: 3000 }
                );
              }
            }
          );
      },
      error: () => {
        this.snackBar.open('CAPTCHA failed. Please try again.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  updatePassword(): void {
    this.passwordSet = true;
    this.pageValid =
      this.password !== '' &&
      this.password === this.confirmPassword &&
      this.isPasswordSafe(this.password);
    this.userSettingsChanged = true;
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

  isPasswordSafe(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  }

  onPasswordFocusOut(): void {
    if (!this.isPasswordSafe(this.password)) {
      this.snackBar.open(
        'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.',
        'Close',
        {
          duration: 5000,
        }
      );
    }
  }

  onConfirmPasswordFocusOut(): void {
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', {
        duration: 5000,
      });
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  onCaptchaResolved(token: string | null) {
    this.captchaToken = token ?? '';
  }
}
