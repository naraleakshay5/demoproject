import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsTensileStrengthCheckComponent } from './as-tensile-strength-check.component';

describe('AsTensileStrengthCheckComponent', () => {
  let component: AsTensileStrengthCheckComponent;
  let fixture: ComponentFixture<AsTensileStrengthCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsTensileStrengthCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsTensileStrengthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
