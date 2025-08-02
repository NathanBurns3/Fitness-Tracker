import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@Component({
  selector: 'account-management',
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css',
  standalone: false,
})
export class AccountManagementComponent {
  constructor(private dialog: MatDialog) {}

  openUpdatePassword(): void {
    this.dialog.open(UpdatePasswordComponent, {
      width: '500px',
      height: '500px',
    });
  }

  openDeleteAccount(): void {
    this.dialog.open(DeleteAccountComponent, {
      width: '500px',
      height: '250px',
    });
  }
}
