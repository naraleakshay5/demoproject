import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapingComponent } from './taping.component';

describe('TapingComponent', () => {
  let component: TapingComponent;
  let fixture: ComponentFixture<TapingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
