import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaOutputCarrierScanComponent } from './ma-output-carrier-scan.component';

describe('MaOutputCarrierScanComponent', () => {
  let component: MaOutputCarrierScanComponent;
  let fixture: ComponentFixture<MaOutputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaOutputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaOutputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
