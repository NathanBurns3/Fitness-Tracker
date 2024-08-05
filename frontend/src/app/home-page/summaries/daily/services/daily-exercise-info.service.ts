import { Injectable } from '@angular/core';
import { IExerciseInfo } from '../models/exercise-info';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class DailyExerciseInfoService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient) {}
  getDailyExerciseInfo(): Observable<IExerciseInfo> {
    return this.http.get<IExerciseInfo>(this.apiUrl + '/dailyExerciseInfo', {
      headers: getHeaders(),
    });
  }
}
