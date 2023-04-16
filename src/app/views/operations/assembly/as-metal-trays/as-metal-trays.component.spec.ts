import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsMetalTraysComponent } from './as-metal-trays.component';

describe('AsMetalTraysComponent', () => {
  let component: AsMetalTraysComponent;
  let fixture: ComponentFixture<AsMetalTraysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsMetalTraysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsMetalTraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
