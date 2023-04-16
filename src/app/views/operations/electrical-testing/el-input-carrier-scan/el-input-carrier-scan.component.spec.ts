import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElInputCarrierScanComponent } from './el-input-carrier-scan.component';

describe('ElInputCarrierScanComponent', () => {
  let component: ElInputCarrierScanComponent;
  let fixture: ComponentFixture<ElInputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElInputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElInputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
