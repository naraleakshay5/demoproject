import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsMaterialScanComponent } from './ms-material-scan.component';

describe('MsMaterialScanComponent', () => {
  let component: MsMaterialScanComponent;
  let fixture: ComponentFixture<MsMaterialScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsMaterialScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsMaterialScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
