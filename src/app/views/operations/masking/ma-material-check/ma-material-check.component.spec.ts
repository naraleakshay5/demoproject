import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaMaterialCheckComponent } from './ma-material-check.component';

describe('MaMaterialCheckComponent', () => {
  let component: MaMaterialCheckComponent;
  let fixture: ComponentFixture<MaMaterialCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaMaterialCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaMaterialCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
