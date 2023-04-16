import { TestBed } from '@angular/core/testing';

import { AoiService } from './aoi.service';

describe('AoiService', () => {
  let service: AoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
