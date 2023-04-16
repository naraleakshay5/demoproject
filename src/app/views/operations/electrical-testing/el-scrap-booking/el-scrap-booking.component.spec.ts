import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElScrapBookingComponent } from './el-scrap-booking.component';

describe('ElScrapBookingComponent', () => {
  let component: ElScrapBookingComponent;
  let fixture: ComponentFixture<ElScrapBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElScrapBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElScrapBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
