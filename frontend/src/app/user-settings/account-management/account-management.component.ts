import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent {
  constructor(private dialog: MatDialog) {}

  openUpdatePassword(): void {
    this.dialog.open(UpdatePasswordComponent, {
      width: '500px',
      height: '500px',
    });
  }

  deleteAccount(): void {
    // Delete account logic
  }
}
