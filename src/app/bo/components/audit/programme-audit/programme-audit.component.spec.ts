import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeAuditComponent } from './programme-audit.component';

describe('ProgrammeAuditComponent', () => {
  let component: ProgrammeAuditComponent;
  let fixture: ComponentFixture<ProgrammeAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgrammeAuditComponent]
    });
    fixture = TestBed.createComponent(ProgrammeAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
