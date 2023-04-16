import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsImpulseTestComponent } from './as-impulse-test.component';

describe('AsImpulseTestComponent', () => {
  let component: AsImpulseTestComponent;
  let fixture: ComponentFixture<AsImpulseTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsImpulseTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsImpulseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
