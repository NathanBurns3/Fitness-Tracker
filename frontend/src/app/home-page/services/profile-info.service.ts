import { Injectable } from '@angular/core';
import { IProfileInfo } from '../models/profile-info';
import { WeightGoalEnum } from 'src/app/user-settings/models/weight-goal-enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileInfoService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient, private router: Router) {}

  getProfileInfo(): Observable<IProfileInfo> {
    return this.http.get<IProfileInfo>(this.apiUrl + '/profile', {
      headers: getHeaders(this.router),
    });
  }
}
