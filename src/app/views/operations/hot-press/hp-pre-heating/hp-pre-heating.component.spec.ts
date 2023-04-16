import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpPreHeatingComponent } from './hp-pre-heating.component';

describe('HpPreHeatingComponent', () => {
  let component: HpPreHeatingComponent;
  let fixture: ComponentFixture<HpPreHeatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpPreHeatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpPreHeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
