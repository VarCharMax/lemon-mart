import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { SimpleDialogComponent } from './simple-dialog.component';

export interface IUIService {
  showToast(message: string, action: string, config?: MatSnackBarConfig): void;
  showDialog(
    title: string,
    content: string,
    okText: string,
    cancelText?: string,
    customConfig?: MatDialogConfig
  ): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class UiService implements IUIService {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  showToast(message: string, action = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(
      message,
      action,
      config || {
        duration: 7000,
      }
    );
  }

  showDialog(
    title: string,
    content: string,
    okText = 'OK',
    cancelText?: string,
    customConfig?: MatDialogConfig
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(
      SimpleDialogComponent,
      customConfig || {
        width: '300px',
        data: { title, content, okText, cancelText },
      }
    );
    return dialogRef.afterClosed();
  }
}
