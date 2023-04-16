import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsMaterialCheckComponent } from './ms-material-check.component';

describe('MsMaterialCheckComponent', () => {
  let component: MsMaterialCheckComponent;
  let fixture: ComponentFixture<MsMaterialCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsMaterialCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsMaterialCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
