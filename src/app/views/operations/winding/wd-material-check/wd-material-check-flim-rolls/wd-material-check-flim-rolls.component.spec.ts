import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdMaterialCheckFlimRollsComponent } from './wd-material-check-flim-rolls.component';

describe('WdMaterialCheckFlimRollsComponent', () => {
  let component: WdMaterialCheckFlimRollsComponent;
  let fixture: ComponentFixture<WdMaterialCheckFlimRollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdMaterialCheckFlimRollsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdMaterialCheckFlimRollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
