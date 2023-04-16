import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCarrierScanComponent } from './output-carrier-scan.component';

describe('OutputCarrierScanComponent', () => {
  let component: OutputCarrierScanComponent;
  let fixture: ComponentFixture<OutputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
