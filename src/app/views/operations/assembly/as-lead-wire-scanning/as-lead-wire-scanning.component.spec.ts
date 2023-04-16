import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsLeadWireScanningComponent } from './as-lead-wire-scanning.component';

describe('AsLeadWireScanningComponent', () => {
  let component: AsLeadWireScanningComponent;
  let fixture: ComponentFixture<AsLeadWireScanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsLeadWireScanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsLeadWireScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
