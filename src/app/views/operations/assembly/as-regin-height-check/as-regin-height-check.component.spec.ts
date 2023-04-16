import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsReginHeightCheckComponent } from './as-regin-height-check.component';

describe('AsReginHeightCheckComponent', () => {
  let component: AsReginHeightCheckComponent;
  let fixture: ComponentFixture<AsReginHeightCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsReginHeightCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsReginHeightCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
