import { inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationData, SnackBar } from '../../shared/snackBars/snack-bar/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar)
  
  //To show succes message
  success(message?: string){
    let data: NotificationData = {
      message: message || 'Successful',
      type: 'success'
    };

    this.openSnackBar(data);
  }

  error(message?: string){
    let data: NotificationData = {
      message: message || 'An error was occured',
      type: 'error'
    };

    this.openSnackBar(data);
  }

   warning(message?: string){
    let data: NotificationData = {
      message: message || 'Warning',
      type: 'warning'
    };

    this.openSnackBar(data);
  }

   info(message?: string){
    let data: NotificationData = {
      message: message || 'Info',
      type: 'info'
    };

    this.openSnackBar(data);
  }

  private openSnackBar(data: NotificationData) {
    this._snackBar.openFromComponent(SnackBar,{
      data,
      panelClass: []
    });
  };
}



