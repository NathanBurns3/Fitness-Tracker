import { EventEmitter, Injectable } from '@angular/core';
import { IFood } from '../../models/food';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DailyFoodService {
  private apiUrl = environment.apiURL + '/meal';
  foodAdded = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getFoods(): Observable<IFood[]> {
    return this.http.get<IFood[]>(this.apiUrl + '/dailyFoods', {
      headers: getHeaders(this.router),
    });
  }

  addFood(food: IFood): Observable<boolean> {
    return this.http
      .post<{ success: Boolean; message: string }>(
        this.apiUrl + '/addDailyFood',
        { food: food },
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.foodAdded.emit();
            this.snackBar.open(food.description + ' was added!', '', {
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

  updateFood(food: IFood): Observable<boolean> {
    return this.http
      .put<{ success: Boolean; message: string }>(
        this.apiUrl + '/updateDailyFood',
        { fdcID: food.fdcID, food: food },
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.foodAdded.emit();
            this.snackBar.open(food.description + ' was updated!', '', {
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

  deleteFood(food: IFood): Observable<boolean> {
    return this.http
      .delete<{ success: Boolean; message: string }>(
        this.apiUrl + '/deleteDailyFood/' + food.fdcID,
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.foodAdded.emit();
            this.snackBar.open(food.description + ' was deleted!', '', {
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
