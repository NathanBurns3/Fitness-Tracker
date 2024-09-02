import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IFood, Nutrient_Ids } from 'src/app/add-meal/models/food';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';
@Injectable({
  providedIn: 'root',
})
export class MealLookupService {
  private apiUrl = environment.apiURL + '/meal';
  meals: IFood[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  searchMeals(meal: string): Observable<IFood[]> {
    return this.http
      .get<IFood[]>(this.apiUrl + '/searchFoods', {
        params: { meal: meal },
        headers: getHeaders(this.router),
      })
      .pipe(
        map((response) => response),
        catchError((error: Error | any) => {
          console.error(error.error.message);
          return throwError(() => new Error(error.message));
        })
      );
  }

  updateNutritions(meal: IFood): Observable<IFood> {
    return this.http
      .put<IFood>(this.apiUrl + '/updateNutritions', meal, {
        headers: getHeaders(this.router),
      })
      .pipe(
        map((response) => response),
        catchError((error: Error | any) => {
          console.error(error.error.message);
          return throwError(() => new Error(error.message));
        })
      );
  }
}
