import { TestBed } from '@angular/core/testing';

import { SmqService } from './smq.service';

describe('SmqService', () => {
  let service: SmqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
