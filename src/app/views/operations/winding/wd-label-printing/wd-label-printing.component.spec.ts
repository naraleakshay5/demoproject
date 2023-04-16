import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdLabelPrintingComponent } from './wd-label-printing.component';

describe('WdLabelPrintingComponent', () => {
  let component: WdLabelPrintingComponent;
  let fixture: ComponentFixture<WdLabelPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdLabelPrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdLabelPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
