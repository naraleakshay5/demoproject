import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpKardexRestoComponent } from './tp-kardex-resto.component';

describe('TpKardexRestoComponent', () => {
  let component: TpKardexRestoComponent;
  let fixture: ComponentFixture<TpKardexRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpKardexRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpKardexRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
