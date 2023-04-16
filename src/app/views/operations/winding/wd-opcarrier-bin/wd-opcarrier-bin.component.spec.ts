import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdOPCarrierBinComponent } from './wd-opcarrier-bin.component';

describe('WdOPCarrierBinComponent', () => {
  let component: WdOPCarrierBinComponent;
  let fixture: ComponentFixture<WdOPCarrierBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdOPCarrierBinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdOPCarrierBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
