import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUserBookingComponent } from './data-user-booking.component';

describe('DataUserBookingComponent', () => {
  let component: DataUserBookingComponent;
  let fixture: ComponentFixture<DataUserBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUserBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataUserBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
