import { Injectable } from '@angular/core';
import { IExerciseInfo } from '../../daily/models/exercise-info';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MonthlyExerciseInfoService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient, private router: Router) {}

  getMonthlyExerciseInfo(): Observable<IExerciseInfo> {
    return this.http.get<IExerciseInfo>(this.apiUrl + '/monthlyExerciseInfo', {
      headers: getHeaders(this.router),
    });
  }
}
