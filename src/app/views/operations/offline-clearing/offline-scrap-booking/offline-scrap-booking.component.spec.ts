import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineScrapBookingComponent } from './offline-scrap-booking.component';

describe('OfflineScrapBookingComponent', () => {
  let component: OfflineScrapBookingComponent;
  let fixture: ComponentFixture<OfflineScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
