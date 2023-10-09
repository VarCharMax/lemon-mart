import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1234' } },
          },
        },
      ],
      imports: [HttpClientTestingModule],
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
