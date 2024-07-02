import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupReclamationHomeComponent } from './popup-reclamation-home.component';

describe('PopupReclamationHomeComponent', () => {
  let component: PopupReclamationHomeComponent;
  let fixture: ComponentFixture<PopupReclamationHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupReclamationHomeComponent]
    });
    fixture = TestBed.createComponent(PopupReclamationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
