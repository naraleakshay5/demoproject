import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResinComponent } from './resin.component';

describe('ResinComponent', () => {
  let component: ResinComponent;
  let fixture: ComponentFixture<ResinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
