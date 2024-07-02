import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcDocumentsComponent } from './add-proc-documents.component';

describe('AddProcDocumentsComponent', () => {
  let component: AddProcDocumentsComponent;
  let fixture: ComponentFixture<AddProcDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProcDocumentsComponent]
    });
    fixture = TestBed.createComponent(AddProcDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
