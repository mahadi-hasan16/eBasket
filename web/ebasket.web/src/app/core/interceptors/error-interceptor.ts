import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from '../services/snack-bar-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(SnackBarService);
  return next(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          if (err.error.errors) {
            const modelStateErrors = [];

            for (let key in err.error.errors) {
              if (err.error.errors[key]) {
                modelStateErrors.push(err.error.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          }
          else {
            snackBar.openSnackBar(err.error.title || err.error);
          }
        }

        if (err.status === 401) {
          snackBar.openSnackBar(err.error.title || err.error);
        }

        if (err.status === 404) {
          snackBar.openSnackBar(err.error.title || err.error);
        }

        if (err.status === 500) {
          snackBar.openSnackBar(err.error.title || err.error);
        }

        return throwError(() => err);
      })
    );
};
