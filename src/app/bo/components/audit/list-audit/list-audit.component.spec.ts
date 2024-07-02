import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuditComponent } from './list-audit.component';

describe('ListAuditComponent', () => {
  let component: ListAuditComponent;
  let fixture: ComponentFixture<ListAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAuditComponent]
    });
    fixture = TestBed.createComponent(ListAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
