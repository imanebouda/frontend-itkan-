import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcesDocumentsComponent } from './add-proces-documents.component';

describe('AddProcesDocumentsComponent', () => {
  let component: AddProcesDocumentsComponent;
  let fixture: ComponentFixture<AddProcesDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProcesDocumentsComponent]
    });
    fixture = TestBed.createComponent(AddProcesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
