import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineLineClearanceComponent } from './offline-line-clearance.component';

describe('OfflineLineClearanceComponent', () => {
  let component: OfflineLineClearanceComponent;
  let fixture: ComponentFixture<OfflineLineClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineLineClearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineLineClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
