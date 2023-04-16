import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemInputTrolleysComponent } from './tem-input-trolleys.component';

describe('TemInputTrolleysComponent', () => {
  let component: TemInputTrolleysComponent;
  let fixture: ComponentFixture<TemInputTrolleysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemInputTrolleysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemInputTrolleysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
