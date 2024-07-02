import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndicateurComponent } from './add-indicateur.component';

describe('AddIndicateurComponent', () => {
  let component: AddIndicateurComponent;
  let fixture: ComponentFixture<AddIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIndicateurComponent]
    });
    fixture = TestBed.createComponent(AddIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
