import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpScrapBookingComponent } from './tp-scrap-booking.component';

describe('TpScrapBookingComponent', () => {
  let component: TpScrapBookingComponent;
  let fixture: ComponentFixture<TpScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
