import { Injectable } from '@angular/core';
import { IDailyEatingInfo } from '../models/daily-eating-info';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DailyEatingInfoService {
  private apiUrl = environment.apiURL + '/home';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getDailyEatingInfo(): Observable<IDailyEatingInfo> {
    return this.http.get<IDailyEatingInfo>(this.apiUrl + '/dailyEatingInfo', {
      headers: getHeaders(this.router),
    });
  }

  updateTrackedNutritions(nutritions: string[]): Observable<IDailyEatingInfo> {
    return this.http.put<IDailyEatingInfo>(
      this.apiUrl + '/dailyEatingInfo/trackedNutritions',
      { trackedNutritions: nutritions },
      { headers: getHeaders(this.router) },
    );
  }
}
