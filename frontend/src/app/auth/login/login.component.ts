import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: false
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    const encodedEmail = btoa(this.email);
    const encodedPassword = btoa(this.password);

    this.authService.login(encodedEmail, encodedPassword).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error', error);
        this.snackBar.open('Incorrect email or password', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
