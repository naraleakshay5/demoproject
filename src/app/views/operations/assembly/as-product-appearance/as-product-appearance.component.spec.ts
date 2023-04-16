import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsProductAppearanceComponent } from './as-product-appearance.component';

describe('AsProductAppearanceComponent', () => {
  let component: AsProductAppearanceComponent;
  let fixture: ComponentFixture<AsProductAppearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsProductAppearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsProductAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
