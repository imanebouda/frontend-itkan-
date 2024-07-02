import { TestBed } from '@angular/core/testing';

import { SiteAuditService } from './site-audit.service';

describe('SiteAuditService', () => {
  let service: SiteAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
