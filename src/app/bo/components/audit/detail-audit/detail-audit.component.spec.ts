import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAuditComponent } from './detail-audit.component';

describe('DetailAuditComponent', () => {
  let component: DetailAuditComponent;
  let fixture: ComponentFixture<DetailAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAuditComponent]
    });
    fixture = TestBed.createComponent(DetailAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
