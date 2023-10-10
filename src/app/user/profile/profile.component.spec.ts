import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/app-material.module';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthServiceFake } from 'src/app/auth/auth.service.fake';

import { UserMaterialModule } from '../user-material.module';
import { UserService } from '../user.service';
import { UserServiceFake } from '../user.service.fake';
import { ViewUserComponent } from '../view-user/view-user.component';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

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
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        UserMaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [ProfileComponent, ViewUserComponent],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
