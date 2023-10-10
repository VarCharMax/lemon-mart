/* eslint-disable @typescript-eslint/no-unused-vars */
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

import { IUIService } from './ui.service';

export class UiServiceFake implements IUIService {
  showToast(
    message: string,
    action: string,
    config?: MatSnackBarConfig<never> | undefined
  ): void {}
  showDialog(
    title: string,
    content: string,
    okText: string,
    cancelText?: string | undefined,
    customConfig?: MatDialogConfig<never> | undefined
  ): Observable<boolean> {
    return of(true);
  }
}
