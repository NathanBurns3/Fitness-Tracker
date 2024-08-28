import { Injectable } from '@angular/core';
import { IUserSettings } from '../models/user-settings';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { getHeaders } from 'src/utils/http-headers.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private apiUrl = environment.apiURL + '/settings';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  updateUserSettings(userSettings: IUserSettings): Observable<boolean> {
    return this.http
      .put<{ success: boolean; message: string }>(
        this.apiUrl + '/updateUserSettings',
        { settings: userSettings },
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open('User Settings was updated!', '', {
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

  getUserSettings(): Observable<IUserSettings> {
    return this.http.get<IUserSettings>(this.apiUrl + '/userSettings', {
      headers: getHeaders(this.router),
    });
  }

  updatePassword(newPassword: string): Observable<boolean> {
    return this.http
      .put<{ success: boolean; message: string }>(
        this.apiUrl + '/updatePassword',
        { newPassword },
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open('Password was updated!', '', {
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

  deleteAccount(): Observable<boolean> {
    return this.http
      .delete<{ success: boolean; message: string }>(
        this.apiUrl + '/deleteAccount',
        {
          headers: getHeaders(this.router),
        }
      )
      .pipe(
        map((response) => {
          if (response.success) {
            this.snackBar.open('Account was deleted!', '', {
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
