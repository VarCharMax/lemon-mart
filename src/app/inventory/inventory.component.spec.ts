import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MaterialModule } from '../app-material.module';
import { InventoryComponent } from './inventory.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterModule],
      providers: [
        InventoryComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1234' } },
          },
        },
      ],
      declarations: [InventoryComponent],
    });
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
