import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaPrintLabelComponent } from './ma-print-label.component';

describe('MaPrintLabelComponent', () => {
  let component: MaPrintLabelComponent;
  let fixture: ComponentFixture<MaPrintLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaPrintLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaPrintLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
