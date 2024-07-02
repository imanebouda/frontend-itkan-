import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteAuditComponent } from './add-site-audit.component';

describe('AddSiteAuditComponent', () => {
  let component: AddSiteAuditComponent;
  let fixture: ComponentFixture<AddSiteAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSiteAuditComponent]
    });
    fixture = TestBed.createComponent(AddSiteAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
