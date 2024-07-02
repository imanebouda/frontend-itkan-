import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableuauResultIndicateurComponent } from './add-tableuau-result-indicateur.component';

describe('AddTableuauResultIndicateurComponent', () => {
  let component: AddTableuauResultIndicateurComponent;
  let fixture: ComponentFixture<AddTableuauResultIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTableuauResultIndicateurComponent]
    });
    fixture = TestBed.createComponent(AddTableuauResultIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
