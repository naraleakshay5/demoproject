import { TestBed } from '@angular/core/testing';

import { HotPressService } from './hot-press.service';

describe('HotPressService', () => {
  let service: HotPressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotPressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
