import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IFood, Nutrient_Ids } from 'src/app/add-meal/models/food';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MealLookupService {
  private apiUrl = environment.apiURL + '/meal';
  meals: IFood[] = [];

  constructor(private http: HttpClient) {}

  searchMeals(meal: string): Observable<IFood[]> {
    return this.http
      .get<IFood[]>(this.apiUrl + '/searchFoods', {
        params: { meal },
      })
      .pipe(
        map((response) => response),
        catchError((error: Error | any) => {
          console.error(error.message);
          return throwError(() => new Error(error.message));
        })
      );
  }

  updateNutritions(meal: IFood): Observable<IFood> {
    return this.http.put<IFood>(this.apiUrl + '/updateNutritions', meal).pipe(
      map((response) => response),
      catchError((error: Error | any) => {
        console.error(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
