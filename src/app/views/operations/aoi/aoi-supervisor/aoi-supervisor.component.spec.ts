import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiSupervisorComponent } from './aoi-supervisor.component';

describe('AoiSupervisorComponent', () => {
  let component: AoiSupervisorComponent;
  let fixture: ComponentFixture<AoiSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
