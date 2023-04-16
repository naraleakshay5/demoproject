import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdLabelPrintingComponent } from './dd-label-printing.component';

describe('DdLabelPrintingComponent', () => {
  let component: DdLabelPrintingComponent;
  let fixture: ComponentFixture<DdLabelPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdLabelPrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdLabelPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
