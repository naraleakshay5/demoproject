import { TestBed } from '@angular/core/testing';

import { TemperingService } from './tempering.service';

describe('TemperingService', () => {
  let service: TemperingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
