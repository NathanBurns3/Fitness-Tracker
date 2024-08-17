import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of } from 'rxjs';
import { ICustomMeal } from 'src/app/add-meal/models/custom-meal';
import { IFood } from 'src/app/add-meal/models/food';
import { environment } from 'src/environments/environment';
import { getHeaders } from 'src/utils/http-headers.util';

@Injectable({
  providedIn: 'root',
})
export class CustomMealService {
  private apiUrl = environment.apiURL + '/meal';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getCustomMeals(): Observable<ICustomMeal[]> {
    return this.http.get<ICustomMeal[]>(this.apiUrl + '/customMeals', {
      headers: getHeaders(),
    });
  }

  getCustomMeal(id: string): Observable<ICustomMeal> {
    return this.http.get<ICustomMeal>(this.apiUrl + '/customMeal/' + id, {
      headers: getHeaders(),
    });
  }

  deleteCustomMeal(id: string): Observable<boolean> {
    return this.http
      .delete<{ success: boolean; message: string }>(
        this.apiUrl + '/deleteCustomMeal/' + id,
        {
          headers: getHeaders(),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open('Meal was removed!', '', {
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

  updateCustomMeal(meal: ICustomMeal, action: string): Observable<boolean> {
    if (action === 'add') {
      return this.http
        .post<{ success: boolean; message: string }>(
          this.apiUrl + '/addCustomMeal',
          { customMeal: meal },
          {
            headers: getHeaders(),
          }
        )
        .pipe(
          map((response) => {
            if (response.success) {
              this.snackBar.open(meal.name + ' was added!', '', {
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
    } else {
      return this.http
        .put<{ success: boolean; message: string }>(
          this.apiUrl + '/updateCustomMeal',
          { mealID: meal.mealID, customMeal: meal },
          {
            headers: getHeaders(),
          }
        )
        .pipe(
          map((response) => {
            if (response.success) {
              this.snackBar.open(meal.name + ' was updated!', '', {
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
}
