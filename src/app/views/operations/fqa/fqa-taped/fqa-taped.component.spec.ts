import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaTapedComponent } from './fqa-taped.component';

describe('FqaTapedComponent', () => {
  let component: FqaTapedComponent;
  let fixture: ComponentFixture<FqaTapedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaTapedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaTapedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
