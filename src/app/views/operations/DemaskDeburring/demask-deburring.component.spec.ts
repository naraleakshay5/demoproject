import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemaskDeburringComponent } from './demask-deburring.component';

describe('DemaskDeburringComponent', () => {
  let component: DemaskDeburringComponent;
  let fixture: ComponentFixture<DemaskDeburringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemaskDeburringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemaskDeburringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
