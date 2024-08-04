import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of } from 'rxjs';
import { IFood } from 'src/app/add-meal/models/food';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMealsService {
  private apiUrl = environment.apiURL + '/meal';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getFavoriteMeals(): Observable<IFood[]> {
    return this.http.get<IFood[]>(this.apiUrl + '/favoriteMeals', {
      headers: getHeaders(),
    });
  }

  deleteFavoriteMeal(meal: IFood): Observable<boolean> {
    return this.http
      .delete<{ success: boolean; message: string }>(
        this.apiUrl + '/deleteFavoriteMeal/' + meal.fdcID,
        {
          headers: getHeaders(),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open(
              meal.description + ' was removed from favorites!',
              '',
              {
                duration: 2000,
              }
            );
            return true;
          } else {
            this.snackBar.open(response.message, '', {
              duration: 2000,
            });
            return false;
          }
        }),
        catchError((error: Error | any) => {
          this.snackBar.open(error.message, '', {
            duration: 2000,
          });
          return of(false);
        })
      );
  }

  addFavoriteMeal(meal: IFood): Observable<boolean> {
    return this.http
      .post<{ success: boolean; message: string }>(
        this.apiUrl + '/addFavoriteMeal',
        { food: meal },
        {
          headers: getHeaders(),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open(meal.description + ' added to favorites!', '', {
              duration: 2000,
            });
            return true;
          } else {
            this.snackBar.open(response.message, '', {
              duration: 2000,
            });
            return false;
          }
        }),
        catchError((error: Error | any) => {
          this.snackBar.open(error.message, '', {
            duration: 2000,
          });
          return of(false);
        })
      );
  }
}
