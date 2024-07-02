import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentProcessusComponent } from './update-document-processus.component';

describe('UpdateDocumentProcessusComponent', () => {
  let component: UpdateDocumentProcessusComponent;
  let fixture: ComponentFixture<UpdateDocumentProcessusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDocumentProcessusComponent]
    });
    fixture = TestBed.createComponent(UpdateDocumentProcessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
