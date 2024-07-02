import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcedureDocumentComponent } from './list-procedure-document.component';

describe('ListProcedureDocumentComponent', () => {
  let component: ListProcedureDocumentComponent;
  let fixture: ComponentFixture<ListProcedureDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProcedureDocumentComponent]
    });
    fixture = TestBed.createComponent(ListProcedureDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
