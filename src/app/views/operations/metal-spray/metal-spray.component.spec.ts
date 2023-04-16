import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalSprayComponent } from './metal-spray.component';

describe('MetalSprayComponent', () => {
  let component: MetalSprayComponent;
  let fixture: ComponentFixture<MetalSprayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetalSprayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalSprayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
