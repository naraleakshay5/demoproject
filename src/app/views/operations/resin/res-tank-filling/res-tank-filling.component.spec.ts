import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResTankFillingComponent } from './res-tank-filling.component';

describe('ResTankFillingComponent', () => {
  let component: ResTankFillingComponent;
  let fixture: ComponentFixture<ResTankFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResTankFillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResTankFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
