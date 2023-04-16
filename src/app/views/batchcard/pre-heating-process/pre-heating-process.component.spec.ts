import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreHeatingProcessComponent } from './pre-heating-process.component';

describe('PreHeatingProcessComponent', () => {
  let component: PreHeatingProcessComponent;
  let fixture: ComponentFixture<PreHeatingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreHeatingProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreHeatingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
