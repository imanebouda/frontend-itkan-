import { TestBed } from '@angular/core/testing';

import { ChecklistService } from './check-list.service';

describe('CheckListService', () => {
  let service: ChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
