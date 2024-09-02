import { EventEmitter, Injectable } from '@angular/core';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IExercise } from '../models/exercise';
import { catchError, map, Observable, of } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private apiUrl = environment.apiURL + '/exercise';
  exerciseAdded = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getExercisesById(
    selectedMuscleGroup: muscleGroupsEnum
  ): Observable<IExercise[]> {
    return this.http
      .get<IExercise[]>(this.apiUrl + '/exercises/' + selectedMuscleGroup, {
        headers: getHeaders(this.router),
      })
      .pipe(
        map((response) => {
          if (response.length === 0) {
            this.snackBar.open(
              'No exercises found for this muscle group.',
              '',
              {
                duration: 2000,
              }
            );
            return response;
          } else {
            return response;
          }
        }),
        catchError((error: Error | any) => {
          this.snackBar.open(error.error.message, '', {
            duration: 2000,
          });
          return of([]);
        })
      );
  }

  addExercise(
    muscleGroup: muscleGroupsEnum,
    exercise: string
  ): Observable<boolean> {
    return this.http
      .post<{ success: Boolean; message: string }>(
        this.apiUrl + '/addExercise',
        { muscleGroup: muscleGroup, exerciseName: exercise },
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.exerciseAdded.emit();
            this.snackBar.open(exercise + ' was added!', '', {
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
          this.snackBar.open(error.error.message, '', {
            duration: 2000,
          });
          return of(false);
        })
      );
  }

  deleteExercise(
    muscleGroup: muscleGroupsEnum,
    exerciseID: string,
    exerciseName: string
  ): Observable<boolean> {
    return this.http
      .delete<{ success: Boolean; message: string }>(
        this.apiUrl + '/deleteExercise/' + muscleGroup + '/' + exerciseID,
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open(exerciseName + ' was deleted!', '', {
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
          this.snackBar.open(error.error.message, '', {
            duration: 2000,
          });
          return of(false);
        })
      );
  }
}
