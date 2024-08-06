import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class YearlyExercisesService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient) {}

  getYearlyExercises(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl + '/yearlyExerciseGoals', {
      headers: getHeaders(),
    });
  }
}
