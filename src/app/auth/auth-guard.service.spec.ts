import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { MaterialModule } from '../app-material.module';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  // let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [AuthGuardService],
    });
    // service = TestBed.inject(AuthGuardService);
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
