import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpDifferanceSachComponent } from './tp-differance-sach.component';

describe('TpDifferanceSachComponent', () => {
  let component: TpDifferanceSachComponent;
  let fixture: ComponentFixture<TpDifferanceSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpDifferanceSachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpDifferanceSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
