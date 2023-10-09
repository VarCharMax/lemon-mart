import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '24fkzrw3487943uf358lovd' } },
          },
        },
      ],
    });
    // service = TestBed.inject(AuthService);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
