import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsMetalSprayComponent } from './ms-metal-spray.component';

describe('MsMetalSprayComponent', () => {
  let component: MsMetalSprayComponent;
  let fixture: ComponentFixture<MsMetalSprayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsMetalSprayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsMetalSprayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
