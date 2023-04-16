import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpScrapBookingComponent } from './hp-scrap-booking.component';

describe('HpScrapBookingComponent', () => {
  let component: HpScrapBookingComponent;
  let fixture: ComponentFixture<HpScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
