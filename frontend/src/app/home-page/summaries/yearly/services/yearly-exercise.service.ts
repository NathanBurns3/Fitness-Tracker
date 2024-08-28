import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class YearlyExercisesService {
  private apiUrl = environment.apiURL + '/home';

  constructor(private http: HttpClient, private router: Router) {}

  getYearlyExercises(): Observable<number[]> {
    return this.http
      .get<{ yearlyExerciseGoals: number[] }>(
        this.apiUrl + '/yearlyExerciseGoals',
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(map((response) => response.yearlyExerciseGoals));
  }
}
