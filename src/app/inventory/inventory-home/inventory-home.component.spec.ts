import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHomeComponent } from './inventory-home.component';

describe('InventoryHomeComponent', () => {
  let component: InventoryHomeComponent;
  let fixture: ComponentFixture<InventoryHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryHomeComponent]
    });
    fixture = TestBed.createComponent(InventoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
