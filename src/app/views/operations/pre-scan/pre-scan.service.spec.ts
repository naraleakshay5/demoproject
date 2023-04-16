import { TestBed } from '@angular/core/testing';

import { PreScanService } from './pre-scan.service';

describe('PreScanService', () => {
  let service: PreScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
