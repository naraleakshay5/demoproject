import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpLabelPrintingComponent } from './tp-label-printing.component';

describe('TpLabelPrintingComponent', () => {
  let component: TpLabelPrintingComponent;
  let fixture: ComponentFixture<TpLabelPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpLabelPrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpLabelPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
