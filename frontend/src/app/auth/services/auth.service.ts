import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserSettings } from 'src/app/user-settings/models/user-settings';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiURL + '/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signup(userSettings: IUserSettings, password: string, captchaToken: string) {
    return this.http.post(
      this.apiUrl + '/signup',
      { userSettings, password, captchaToken },
      { headers: getHeaders(this.router) }
    );
  }

  login(email: string, password: string, captchaToken?: string) {
    return this.http.post(
      this.apiUrl + '/login',
      { email, password, captchaToken },
      { headers: getHeaders(this.router) }
    );
  }

  logout() {
    return this.http.get(this.apiUrl + '/logout', {
      headers: getHeaders(this.router),
    });
  }

  getUser() {
    return this.http.get(this.apiUrl + '/user', {
      headers: getHeaders(this.router),
    });
  }
}
