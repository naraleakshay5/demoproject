import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsLabelPrintingComponent } from './as-label-printing.component';

describe('AsLabelPrintingComponent', () => {
  let component: AsLabelPrintingComponent;
  let fixture: ComponentFixture<AsLabelPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsLabelPrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsLabelPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
