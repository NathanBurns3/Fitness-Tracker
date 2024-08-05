import { Injectable } from '@angular/core';
import { IDailyEatingInfo } from '../models/daily-eating-info';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class DailyEatingInfoService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient) {}

  getDailyEatingInfo(): Observable<IDailyEatingInfo> {
    return this.http.get<IDailyEatingInfo>(this.apiUrl + '/dailyEatingInfo', {
      headers: getHeaders(),
    });
  }
}
