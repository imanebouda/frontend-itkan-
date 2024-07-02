import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentProcedureComponent } from './update-document-procedure.component';

describe('UpdateDocumentProcedureComponent', () => {
  let component: UpdateDocumentProcedureComponent;
  let fixture: ComponentFixture<UpdateDocumentProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDocumentProcedureComponent]
    });
    fixture = TestBed.createComponent(UpdateDocumentProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
