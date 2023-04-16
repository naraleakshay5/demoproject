import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapBookingComponent } from './scrap-booking.component';

describe('ScrapBookingComponent', () => {
  let component: ScrapBookingComponent;
  let fixture: ComponentFixture<ScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
