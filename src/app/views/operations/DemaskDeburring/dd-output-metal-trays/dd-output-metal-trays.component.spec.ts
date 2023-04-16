import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdOutputMetalTraysComponent } from './dd-output-metal-trays.component';

describe('DdOutputMetalTraysComponent', () => {
  let component: DdOutputMetalTraysComponent;
  let fixture: ComponentFixture<DdOutputMetalTraysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdOutputMetalTraysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdOutputMetalTraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
