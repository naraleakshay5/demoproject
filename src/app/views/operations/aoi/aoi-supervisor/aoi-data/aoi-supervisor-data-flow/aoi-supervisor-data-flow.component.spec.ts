import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiSupervisorDataFlowComponent } from './aoi-supervisor-data-flow.component';

describe('AoiSupervisorDataFlowComponent', () => {
  let component: AoiSupervisorDataFlowComponent;
  let fixture: ComponentFixture<AoiSupervisorDataFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiSupervisorDataFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiSupervisorDataFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
