import { Observable, of } from 'rxjs';

import { CacheService } from '../auth/cache.service';
import { Role } from '../auth/role.enum';
import { IUser } from './user';

const defaultUser: IUser = {
  id: '1234',
  email: '',
  name: {
    first: 'string',
    middle: 'string',
    last: '',
  },
  picture: '',
  role: Role.Manager,
  userStatus: true,
  dateOfBirth: new Date(),
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  },
  phones: [],
};

export class UserServiceFake extends CacheService {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  getCurrentUser(id: string): Observable<IUser> {
    return of(defaultUser);
  }

  getUser(id: string): Observable<IUser> {
    return of(defaultUser);
  }
}
