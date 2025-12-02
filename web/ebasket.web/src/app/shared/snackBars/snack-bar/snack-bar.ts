import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

export interface NotificationData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  icon?: string;
}

@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.css',
  encapsulation: ViewEncapsulation.None,
  imports: [MatButtonModule, MatSnackBarLabel, MatIconModule]
})
export class SnackBar {
  _snackBarRef = inject(MatSnackBarRef);
  _snackBarData = inject<NotificationData>(MAT_SNACK_BAR_DATA);

  getIcon(): string{
    if(this._snackBarData.icon){
      return this._snackBarData.icon;
    }

    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    }

    return icons[this._snackBarData.type] || 'info';
  }

  getIconContainerClass(): string {
    const classes = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    
    return classes[this._snackBarData.type] || 'bg-blue-500';
  }

   getBackgroundClass(): string {
    const classes = {
      success: 'bg-green-50 border border-green-100',
      error: 'bg-red-50 border border-red-100',
      warning: 'bg-yellow-50 border border-yellow-100',
      info: 'bg-blue-50 border border-blue-100'
    };
    
    return classes[this._snackBarData.type] || 'bg-blue-50';
  }

  getTextColorClass(): string {
    const classes = {
      success: 'text-green-800',
      error: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800'
    };
    
    return classes[this._snackBarData.type] || 'text-blue-800';
  }

  getCloseIconColorClass(): string {
    const classes = {
      success: '!text-green-600',
      error: '!text-red-600',
      warning: '!text-yellow-600',
      info: '!text-blue-600'
    };
    
    return classes[this._snackBarData.type] || '!text-blue-600';
  }
}
