import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sign } from 'fake-jwt-sign'; // For fakeAuthProvider only
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { transformError } from '../common/common';
import { CacheService } from './cache.service';
import { Role } from './role.enum';

export interface IAuthService {
  authStatus: BehaviorSubject<IAuthStatus>;
  login(email: string, password: string): Observable<IAuthStatus>;
  logout(): null;
  getToken(): string;
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}
interface IServerAuthResponse {
  accessToken: string;
}

const defaultAuthStatus = { isAuthenticated: false, userRole: Role.None, userId: '' };

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService implements IAuthService {
  private readonly authProvider: (
    email: string,
    password: string
  ) => Observable<IServerAuthResponse>;

  authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  );

  constructor(private httpClient: HttpClient) {
    super();

    this.authStatus.subscribe((authStatus) => this.setItem('authStatus', authStatus));

    // Fake login function to simulate roles
    this.authProvider = this.fakeAuthProvider;
    // Example of a real login call to server-side
    // this.authProvider = this.exampleAuthProvider
  }

  private fakeAuthProvider(
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string
  ): Observable<IServerAuthResponse> {
    if (!email.toLowerCase().endsWith('@test.com')) {
      return throwError(
        () => new Error('Failed to login! Email needs to end with @test.com.')
      );
    }

    const authStatus = {
      isAuthenticated: true,
      userId: 'e4d1bc2ab25c',
      userRole: email.toLowerCase().includes('cashier')
        ? Role.Cashier
        : email.toLowerCase().includes('clerk')
        ? Role.Clerk
        : email.toLowerCase().includes('manager')
        ? Role.Manager
        : Role.None,
    } as IAuthStatus;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse;

    return of(authResponse);
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();

    const loginResponse = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        return jwt_decode(value.accessToken) as IAuthStatus;
      }),
      catchError(transformError)
    );

    loginResponse.subscribe({
      next: (res) => {
        this.authStatus.next(res);
      },
      error: (err) => {
        this.logout();
        return () => throwError(() => new Error(err));
      },
    });

    return loginResponse;
  }

  logout(): null {
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
    return null;
  }

  getToken(): string {
    return this.getItem('jwt') || '';
  }

  private setToken(jwt: string) {
    this.setItem('jwt', jwt);
  }

  private getDecodedToken(): IAuthStatus {
    return jwt_decode(this.getItem('jwt') || '');
  }

  private clearToken() {
    this.removeItem('jwt');
  }
}
