import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAuditComponent } from './gestion-audit.component';

describe('GestionAuditComponent', () => {
  let component: GestionAuditComponent;
  let fixture: ComponentFixture<GestionAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAuditComponent]
    });
    fixture = TestBed.createComponent(GestionAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
