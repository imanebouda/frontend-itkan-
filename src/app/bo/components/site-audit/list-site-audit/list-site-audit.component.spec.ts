import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSiteAuditComponent } from './list-site-audit.component';

describe('ListSiteAuditComponent', () => {
  let component: ListSiteAuditComponent;
  let fixture: ComponentFixture<ListSiteAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSiteAuditComponent]
    });
    fixture = TestBed.createComponent(ListSiteAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
