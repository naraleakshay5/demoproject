import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaRestoBoxPrintingCheckComponent } from './fqa-resto-box-printing-check.component';

describe('FqaRestoBoxPrintingCheckComponent', () => {
  let component: FqaRestoBoxPrintingCheckComponent;
  let fixture: ComponentFixture<FqaRestoBoxPrintingCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaRestoBoxPrintingCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaRestoBoxPrintingCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
