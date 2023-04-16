import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaScreenForKardexComponent } from './fqa-screen-for-kardex.component';

describe('FqaScreenForKardexComponent', () => {
  let component: FqaScreenForKardexComponent;
  let fixture: ComponentFixture<FqaScreenForKardexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaScreenForKardexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaScreenForKardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
