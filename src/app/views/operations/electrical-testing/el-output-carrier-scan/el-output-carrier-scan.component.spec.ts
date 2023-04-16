import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElOutputCarrierScanComponent } from './el-output-carrier-scan.component';

describe('ElOutputCarrierScanComponent', () => {
  let component: ElOutputCarrierScanComponent;
  let fixture: ComponentFixture<ElOutputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElOutputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElOutputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
