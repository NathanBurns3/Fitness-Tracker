import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserSettingsService } from '../services/user-settings.service';
import { Router } from '@angular/router';

@Component({
    selector: 'delete-account',
    templateUrl: './delete-account.component.html',
    standalone: false
})
export class DeleteAccountComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    private userSettingsService: UserSettingsService,
    private router: Router
  ) {}

  closeDeleteAccount(): void {
    this.dialogRef.close();
  }

  DeleteAccount(): void {
    this.userSettingsService.deleteAccount().subscribe((success: boolean) => {
      if (success) {
        this.dialogRef.close();
        this.router.navigate(['/login']);
      }
    });
  }
}
