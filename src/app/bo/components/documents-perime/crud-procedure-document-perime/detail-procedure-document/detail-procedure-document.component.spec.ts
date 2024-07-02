import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProcedureDocumentComponent } from './detail-procedure-document.component';

describe('DetailProcedureDocumentComponent', () => {
  let component: DetailProcedureDocumentComponent;
  let fixture: ComponentFixture<DetailProcedureDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProcedureDocumentComponent]
    });
    fixture = TestBed.createComponent(DetailProcedureDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
