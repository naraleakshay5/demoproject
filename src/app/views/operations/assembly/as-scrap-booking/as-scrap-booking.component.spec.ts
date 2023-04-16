import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsScrapBookingComponent } from './as-scrap-booking.component';

describe('AsScrapBookingComponent', () => {
  let component: AsScrapBookingComponent;
  let fixture: ComponentFixture<AsScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
