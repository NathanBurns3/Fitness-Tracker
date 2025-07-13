import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  standalone: false,
})
export class UpdatePasswordComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdatePasswordComponent>,
    private userSettingsService: UserSettingsService
  ) {}

  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  closeUpdatePassword(): void {
    this.dialogRef.close();
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

  savePassword(): void {
    if (!this.isPasswordSafe(this.newPassword)) {
      this.errorMessage =
        'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const encodedPassword = btoa(this.newPassword);
    this.userSettingsService
      .updatePassword(encodedPassword)
      .subscribe((success: boolean) => {
        if (success) {
          this.dialogRef.close();
        } else {
          this.errorMessage = 'Failed to update password.';
        }
      });
  }
}
