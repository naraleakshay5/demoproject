import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaImpulseTestComponent } from './fqa-impulse-test.component';

describe('FqaImpulseTestComponent', () => {
  let component: FqaImpulseTestComponent;
  let fixture: ComponentFixture<FqaImpulseTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaImpulseTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaImpulseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
