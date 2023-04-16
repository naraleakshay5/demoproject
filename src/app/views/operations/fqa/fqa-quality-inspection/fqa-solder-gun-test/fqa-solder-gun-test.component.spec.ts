import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaSolderGunTestComponent } from './fqa-solder-gun-test.component';

describe('FqaSolderGunTestComponent', () => {
  let component: FqaSolderGunTestComponent;
  let fixture: ComponentFixture<FqaSolderGunTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaSolderGunTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaSolderGunTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
