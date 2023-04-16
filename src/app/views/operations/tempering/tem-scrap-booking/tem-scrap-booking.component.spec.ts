import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemScrapBookingComponent } from './tem-scrap-booking.component';

describe('TemScrapBookingComponent', () => {
  let component: TemScrapBookingComponent;
  let fixture: ComponentFixture<TemScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
