import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsMaterialCheckComponent } from './as-material-check.component';

describe('AsMaterialCheckComponent', () => {
  let component: AsMaterialCheckComponent;
  let fixture: ComponentFixture<AsMaterialCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsMaterialCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsMaterialCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
