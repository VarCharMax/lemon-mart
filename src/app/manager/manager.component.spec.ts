import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../app-material.module';
import { ManagerComponent } from './manager.component';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
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
