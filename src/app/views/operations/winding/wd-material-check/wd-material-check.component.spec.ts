import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdMaterialCheckComponent } from './wd-material-check.component';

describe('WdMaterialCheckComponent', () => {
  let component: WdMaterialCheckComponent;
  let fixture: ComponentFixture<WdMaterialCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdMaterialCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdMaterialCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
