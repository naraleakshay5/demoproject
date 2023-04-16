import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpToolChangeOverComponent } from './tp-tool-change-over.component';

describe('TpToolChangeOverComponent', () => {
  let component: TpToolChangeOverComponent;
  let fixture: ComponentFixture<TpToolChangeOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpToolChangeOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpToolChangeOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
