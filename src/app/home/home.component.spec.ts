import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { MaterialModule } from '../app-material.module';
import { AuthService } from '../auth/auth.service';
import { AuthServiceFake } from '../auth/auth.service.fake';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1234' } },
          },
        },
        {
          provide: AuthService,
          useClass: AuthServiceFake,
        },
      ],
      imports: [HttpClientTestingModule, MaterialModule],
      declarations: [HomeComponent, LoginComponent],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
