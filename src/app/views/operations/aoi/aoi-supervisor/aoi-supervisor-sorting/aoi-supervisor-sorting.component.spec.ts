import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiSupervisorSortingComponent } from './aoi-supervisor-sorting.component';

describe('AoiSupervisorSortingComponent', () => {
  let component: AoiSupervisorSortingComponent;
  let fixture: ComponentFixture<AoiSupervisorSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiSupervisorSortingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiSupervisorSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
