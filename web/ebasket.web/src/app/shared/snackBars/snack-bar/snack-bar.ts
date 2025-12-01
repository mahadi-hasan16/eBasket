import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.css',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarAction, MatIconModule]
})
export class SnackBar {
  _snackBarRef = inject(MatSnackBarRef);
  _snackBarData = inject<{message: string, icon: string}>(MAT_SNACK_BAR_DATA);
}
