import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsScrapBookingComponent } from './ms-scap-booking.component';

describe('MsScapBookingComponent', () => {
  let component: MsScrapBookingComponent;
  let fixture: ComponentFixture<MsScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsScrapBookingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
