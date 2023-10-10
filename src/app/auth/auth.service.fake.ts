import { BehaviorSubject, Observable, of } from 'rxjs';

import { IAuthService, IAuthStatus } from './auth.service';
import { Role } from './role.enum';

const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: true,
  userRole: Role.Manager,
  userId: 'e4d1bc2ab25c',
};

export class AuthServiceFake implements IAuthService {
  authStatus = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  login(email: string, password: string): Observable<IAuthStatus> {
    return of(defaultAuthStatus);
  }
  logout(): null {
    return null;
  }
  getToken(): string {
    return 'abcde';
  }
}
