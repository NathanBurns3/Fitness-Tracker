import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  email = '';
  password = '';
  showCaptcha = false;
  captchaToken = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  login() {
    const encodedEmail = btoa(this.email);
    const encodedPassword = btoa(this.password);

    if (this.showCaptcha) {
      this.recaptchaV3Service.execute('login').subscribe({
        next: (token: string) => {
          this.captchaToken = token;
          this.executeLogin(encodedEmail, encodedPassword, this.captchaToken);
        },
        error: () => {
          this.snackBar.open('CAPTCHA failed. Please try again.', 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      this.executeLogin(encodedEmail, encodedPassword);
    }
  }

  private executeLogin(email: string, password: string, captchaToken?: string) {
    this.authService.login(email, password, captchaToken).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        if (
          error.status === 429 &&
          error.error?.message === 'CAPTCHA required'
        ) {
          this.showCaptcha = true;
          this.snackBar.open('Please complete the CAPTCHA.', 'Close', {
            duration: 3000,
          });
        } else if (
          error.status === 400 &&
          error.error?.message === 'CAPTCHA verification failed'
        ) {
          this.snackBar.open(
            'CAPTCHA verification failed. Please try again.',
            'Close',
            { duration: 3000 }
          );
        } else {
          this.snackBar.open('Incorrect email or password', 'Close', {
            duration: 3000,
          });
        }
      }
    );
  }
}
