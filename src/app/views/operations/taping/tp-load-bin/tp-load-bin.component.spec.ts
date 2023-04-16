import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpLoadBinComponent } from './tp-load-bin.component';

describe('TpLoadBinComponent', () => {
  let component: TpLoadBinComponent;
  let fixture: ComponentFixture<TpLoadBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpLoadBinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpLoadBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
