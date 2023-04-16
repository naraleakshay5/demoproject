import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaIrTestComponent } from './fqa-ir-test.component';

describe('FqaIrTestComponent', () => {
  let component: FqaIrTestComponent;
  let fixture: ComponentFixture<FqaIrTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaIrTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaIrTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
