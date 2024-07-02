import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSiteAuditComponent } from './update-site-audit.component';

describe('UpdateSiteAuditComponent', () => {
  let component: UpdateSiteAuditComponent;
  let fixture: ComponentFixture<UpdateSiteAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSiteAuditComponent]
    });
    fixture = TestBed.createComponent(UpdateSiteAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
