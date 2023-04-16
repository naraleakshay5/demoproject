import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeburringTemperinComponent } from './deburring-temperin.component';

describe('DeburringTemperinComponent', () => {
  let component: DeburringTemperinComponent;
  let fixture: ComponentFixture<DeburringTemperinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeburringTemperinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeburringTemperinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
