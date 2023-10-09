import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MaterialModule } from '../app-material.module';
import { ManagerComponent } from './manager.component';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterModule],
      providers: [
        ManagerComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1234' } },
          },
        },
      ],
      declarations: [ManagerComponent],
    });
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
