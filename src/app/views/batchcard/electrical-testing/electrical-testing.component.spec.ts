import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalTestingComponent } from './electrical-testing.component';

describe('ElectricalTestingComponent', () => {
  let component: ElectricalTestingComponent;
  let fixture: ComponentFixture<ElectricalTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricalTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
