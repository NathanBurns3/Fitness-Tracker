import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  standalone: false,
})
export class VerifyEmailComponent implements OnInit {
  isLoading = true;
  isSuccess = false;
  errorMessage = '';
  verifiedEmail = '';
  verificationToken = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    if (token) {
      this.verificationToken = token;
      this.verifyEmail(token);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No verification token provided';
    }
  }

  verifyEmail(token: string) {
    this.authService.verifyEmail(token).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.verifiedEmail = response.email;
        this.snackBar.open('Email verified successfully!', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Verification failed';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
      },
    });
  }

  completeRegistration() {
    this.isLoading = true;
    this.authService
      .completeRegistrationWithToken(this.verificationToken)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open(
            'Registration complete! You can now log in.',
            'Close',
            { duration: 3000 },
          );
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed';
          this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
