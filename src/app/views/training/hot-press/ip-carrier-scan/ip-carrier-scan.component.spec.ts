import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpCarrierScanComponent } from './ip-carrier-scan.component';

describe('IpCarrierScanComponent', () => {
  let component: IpCarrierScanComponent;
  let fixture: ComponentFixture<IpCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
