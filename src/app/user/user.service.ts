import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService, IAuthStatus } from '../auth/auth.service';
import { CacheService } from '../auth/cache.service';
import { transformError } from '../common/common';
import { IUser, User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CacheService {
  currentUser = new BehaviorSubject<IUser>(this.getItem('user') || new User());
  private currentAuthStatus = <IAuthStatus>{};
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    super();
    this.currentUser.subscribe((user) => this.setItem('user', user));
    this.authService.authStatus.subscribe(
      (authStatus) => (this.currentAuthStatus = authStatus)
    );
  }

  getUser(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.baseUrl}/v1/user/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    this.setItem('draft-user', user);

    const updateResponse = this.httpClient
      .put<IUser>(`${environment.baseUrl}/v1/user/${user || 0}`, user)
      .pipe(catchError(transformError));

    updateResponse.subscribe({
      next: (res) => this.currentUser.next(res),
      error: (err) => throwError(() => new Error(err)),
      complete: () => this.removeItem('draft-user'),
    });

    return updateResponse;
  }

  getCurrentUser(): Observable<IUser> {
    const userObservable = this.getUser(this.currentAuthStatus.userId).pipe(
      catchError(transformError)
    );

    userObservable.subscribe({
      next: (user) => this.currentUser.next(user),
      error: (err) => throwError(() => new Error(err)),
    });

    return userObservable;
  }
}
