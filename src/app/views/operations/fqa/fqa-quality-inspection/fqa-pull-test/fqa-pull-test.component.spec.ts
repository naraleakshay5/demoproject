import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaPullTestComponent } from './fqa-pull-test.component';

describe('FqaPullTestComponent', () => {
  let component: FqaPullTestComponent;
  let fixture: ComponentFixture<FqaPullTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaPullTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaPullTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
