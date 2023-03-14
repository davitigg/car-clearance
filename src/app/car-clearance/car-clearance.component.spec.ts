import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarClearanceComponent } from './car-clearance.component';

describe('CarClearanceComponent', () => {
  let component: CarClearanceComponent;
  let fixture: ComponentFixture<CarClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarClearanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
