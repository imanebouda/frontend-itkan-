import { TestBed } from '@angular/core/testing';

import { ProgrammeAuditService } from './programme-audit.service';

describe('ProgrammeAuditService', () => {
  let service: ProgrammeAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammeAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
