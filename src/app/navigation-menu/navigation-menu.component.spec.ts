import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../app-material.module';
import { NavigationMenuComponent } from './navigation-menu.component';

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [NavigationMenuComponent],
    });
    fixture = TestBed.createComponent(NavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
