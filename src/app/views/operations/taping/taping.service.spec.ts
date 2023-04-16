import { TestBed } from '@angular/core/testing';

import { TapingService } from './taping.service';

describe('TapingService', () => {
  let service: TapingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TapingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
