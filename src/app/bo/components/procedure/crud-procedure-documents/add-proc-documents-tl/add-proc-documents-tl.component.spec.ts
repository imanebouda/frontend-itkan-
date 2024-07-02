import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcDocumentsTlComponent } from './add-proc-documents-tl.component';

describe('AddProcDocumentsTlComponent', () => {
  let component: AddProcDocumentsTlComponent;
  let fixture: ComponentFixture<AddProcDocumentsTlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProcDocumentsTlComponent]
    });
    fixture = TestBed.createComponent(AddProcDocumentsTlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
