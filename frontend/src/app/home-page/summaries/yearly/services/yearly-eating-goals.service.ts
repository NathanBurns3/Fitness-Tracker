import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class YearlyEatingGoalsService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient) {}

  getYearlyEatingGoals(): Observable<number[]> {
    return this.http
      .get<{ yearlyEatingGoals: number[] }>(
        this.apiUrl + '/yearlyEatingGoals',
        {
          headers: getHeaders(),
        }
      )
      .pipe(map((response) => response.yearlyEatingGoals));
  }
}
