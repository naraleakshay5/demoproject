import { TestBed } from '@angular/core/testing';

import { ResinService } from './resin.service';

describe('ResinService', () => {
  let service: ResinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
