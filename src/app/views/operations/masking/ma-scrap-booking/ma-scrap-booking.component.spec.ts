import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaScrapBookingComponent } from './ma-scrap-booking.component';

describe('MaScrapBookingComponent', () => {
  let component: MaScrapBookingComponent;
  let fixture: ComponentFixture<MaScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
