import { inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBar } from '../../shared/snackBars/snack-bar/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar)
  
  openSnackBar(message: string, icon: string = 'check') {
    this._snackBar.openFromComponent(SnackBar,{
      data: {message, icon}
    });
  };
}



