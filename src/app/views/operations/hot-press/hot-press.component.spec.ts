import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotPressComponent } from './hot-press.component';

describe('HotPressComponent', () => {
  let component: HotPressComponent;
  let fixture: ComponentFixture<HotPressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotPressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotPressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
