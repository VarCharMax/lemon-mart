import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sign } from 'fake-jwt-sign'; // For fakeAuthProvider only
import * as decode from 'jwt-decode';
import {
  BehaviorSubject,
  Observable,
  throwError as observableThrowError,
  of,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Role } from './role.enum';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}
interface IServerAuthResponse {
  accessToken: string;
}

const defaultAuthStatus = { isAuthenticated: false, userRole: Role.None, userId: null };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
}
