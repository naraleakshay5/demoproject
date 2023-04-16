import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdScrapBookingComponent } from './dd-scrap-booking.component';

describe('DdScrapBookingComponent', () => {
  let component: DdScrapBookingComponent;
  let fixture: ComponentFixture<DdScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
