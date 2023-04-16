import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreHeatingComponent } from './pre-heating.component';

describe('PreHeatingComponent', () => {
  let component: PreHeatingComponent;
  let fixture: ComponentFixture<PreHeatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreHeatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreHeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
