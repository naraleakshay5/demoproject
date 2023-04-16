import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaInputScanComponent } from './ma-input-scan.component';

describe('MaInputScanComponent', () => {
  let component: MaInputScanComponent;
  let fixture: ComponentFixture<MaInputScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaInputScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaInputScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
