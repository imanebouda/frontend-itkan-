import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcessusDocumentComponent } from './list-processus-document.component';

describe('ListProcessusDocumentComponent', () => {
  let component: ListProcessusDocumentComponent;
  let fixture: ComponentFixture<ListProcessusDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProcessusDocumentComponent]
    });
    fixture = TestBed.createComponent(ListProcessusDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
