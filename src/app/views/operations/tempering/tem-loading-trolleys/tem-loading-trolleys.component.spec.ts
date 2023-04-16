import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemLoadingTrolleysComponent } from './tem-loading-trolleys.component';

describe('TemLoadingTrolleysComponent', () => {
  let component: TemLoadingTrolleysComponent;
  let fixture: ComponentFixture<TemLoadingTrolleysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemLoadingTrolleysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemLoadingTrolleysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
