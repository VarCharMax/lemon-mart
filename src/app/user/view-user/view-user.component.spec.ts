import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/app-material.module';

import { ViewUserComponent } from './view-user.component';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ViewUserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1234' } },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
