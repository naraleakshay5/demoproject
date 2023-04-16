import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinePrePressComponent } from './offline-pre-press.component';

describe('OfflinePrePressComponent', () => {
  let component: OfflinePrePressComponent;
  let fixture: ComponentFixture<OfflinePrePressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflinePrePressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflinePrePressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
