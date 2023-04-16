import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiSupervisorProcessorComponent } from './aoi-supervisor-processor.component';

describe('AoiSupervisorProcessorComponent', () => {
  let component: AoiSupervisorProcessorComponent;
  let fixture: ComponentFixture<AoiSupervisorProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiSupervisorProcessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiSupervisorProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
