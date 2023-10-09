import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/app-material.module';

import { InventoryHomeComponent } from './inventory-home.component';

describe('InventoryHomeComponent', () => {
  let component: InventoryHomeComponent;
  let fixture: ComponentFixture<InventoryHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InventoryHomeComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1234' } },
          },
        },
      ],
      imports: [MaterialModule],
      declarations: [InventoryHomeComponent],
    });
    fixture = TestBed.createComponent(InventoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
