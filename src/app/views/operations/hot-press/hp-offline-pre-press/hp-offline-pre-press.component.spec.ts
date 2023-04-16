import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpOfflinePrePressComponent } from './hp-offline-pre-press.component';

describe('HpOfflinePrePressComponent', () => {
  let component: HpOfflinePrePressComponent;
  let fixture: ComponentFixture<HpOfflinePrePressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpOfflinePrePressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpOfflinePrePressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
