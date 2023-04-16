import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaLabelScrapBookingComponent } from './ma-label-scrap-booking.component';

describe('MaLabelScrapBookingComponent', () => {
  let component: MaLabelScrapBookingComponent;
  let fixture: ComponentFixture<MaLabelScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaLabelScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaLabelScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
