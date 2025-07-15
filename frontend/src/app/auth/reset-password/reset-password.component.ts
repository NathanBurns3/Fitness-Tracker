import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: false,
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.snackBar.open('Invalid reset link', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.snackBar.open('Please fill in all fields', 'Close', {
        duration: 3000,
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    if (!this.isPasswordValid(this.newPassword)) {
      this.snackBar.open(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
        'Close',
        { duration: 5000 }
      );
      return;
    }

    this.isLoading = true;
    const encodedPassword = btoa(this.newPassword);

    this.authService.resetPassword(this.token, encodedPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Password reset successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(
          error.error?.message || 'Password reset failed',
          'Close',
          { duration: 5000 }
        );
      },
    });
  }

  private isPasswordValid(password: string): boolean {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
