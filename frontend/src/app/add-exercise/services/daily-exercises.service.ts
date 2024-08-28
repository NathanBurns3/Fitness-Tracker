import { EventEmitter, Injectable } from '@angular/core';
import { IExercise } from '../models/exercise';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from 'src/utils/http-headers.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DailyExercisesService {
  private apiUrl = environment.apiURL + '/exercise';
  exerciseAdded = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getExercises(): Observable<IExercise[]> {
    return this.http.get<IExercise[]>(this.apiUrl + '/dailyExercises', {
      headers: getHeaders(this.router),
    });
  }

  addExercise(exercise: IExercise): Observable<boolean> {
    return this.http
      .post<{ success: Boolean; message: string }>(
        this.apiUrl + '/addDailyExercise',
        { exercise: exercise },
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.exerciseAdded.emit();
            this.snackBar.open(exercise.exerciseName + ' was added!', '', {
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

  updateExercise(exercise: IExercise): Observable<boolean> {
    return this.http
      .put<{ success: Boolean; message: string }>(
        this.apiUrl + '/updateDailyExercise',
        { exerciseID: exercise.exerciseID, exercise: exercise },
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open(exercise.exerciseName + ' was updated!', '', {
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

  deleteExercise(exercise: IExercise): Observable<boolean> {
    return this.http
      .delete<{ success: Boolean; message: string }>(
        this.apiUrl + '/deleteDailyExercise/' + exercise.exerciseID,
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open(exercise.exerciseName + ' was deleted!', '', {
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
