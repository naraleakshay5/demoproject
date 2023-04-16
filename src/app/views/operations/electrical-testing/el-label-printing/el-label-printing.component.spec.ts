import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElLabelPrintingComponent } from './el-label-printing.component';

describe('ElLabelPrintingComponent', () => {
  let component: ElLabelPrintingComponent;
  let fixture: ComponentFixture<ElLabelPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElLabelPrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElLabelPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
