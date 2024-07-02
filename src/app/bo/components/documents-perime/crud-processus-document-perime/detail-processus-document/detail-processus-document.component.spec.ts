import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProcessusDocumentComponent } from './detail-processus-document.component';

describe('DetailProcessusDocumentComponent', () => {
  let component: DetailProcessusDocumentComponent;
  let fixture: ComponentFixture<DetailProcessusDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProcessusDocumentComponent]
    });
    fixture = TestBed.createComponent(DetailProcessusDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
