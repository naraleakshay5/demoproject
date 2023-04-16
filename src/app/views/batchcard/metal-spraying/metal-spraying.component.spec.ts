import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalSprayingComponent } from './metal-spraying.component';

describe('MetalSprayingComponent', () => {
  let component: MetalSprayingComponent;
  let fixture: ComponentFixture<MetalSprayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetalSprayingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalSprayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
