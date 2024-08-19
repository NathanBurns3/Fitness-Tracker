import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'delete-account',
  templateUrl: './delete-account.component.html',
})
export class DeleteAccountComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    private userSettingsService: UserSettingsService
  ) {}

  closeDeleteAccount(): void {
    this.dialogRef.close();
  }

  DeleteAccount(): void {
    this.userSettingsService.deleteAccount().subscribe((success: boolean) => {
      if (success) {
        this.dialogRef.close();
        // Nathan: add log out functionality
      }
    });
  }
}
