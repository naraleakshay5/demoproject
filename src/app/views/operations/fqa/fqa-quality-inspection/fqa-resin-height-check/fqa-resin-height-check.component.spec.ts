import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaResinHeightCheckComponent } from './fqa-resin-height-check.component';

describe('FqaResinHeightCheckComponent', () => {
  let component: FqaResinHeightCheckComponent;
  let fixture: ComponentFixture<FqaResinHeightCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaResinHeightCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaResinHeightCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
