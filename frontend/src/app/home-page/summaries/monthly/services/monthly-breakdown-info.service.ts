import { Injectable } from '@angular/core';
import { IMonthlyBreakdownInfo } from '../models/monthly-breakdown-info';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class MonthlyBreakdownInfoService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient, private router: Router) {}

  getMonthlyBreakdownInfo(): Observable<IMonthlyBreakdownInfo[]> {
    return this.http.get<IMonthlyBreakdownInfo[]>(
      this.apiUrl + '/monthlyBreakdownInfo',
      {
        headers: getHeaders(this.router),
      }
    );
  }
}
