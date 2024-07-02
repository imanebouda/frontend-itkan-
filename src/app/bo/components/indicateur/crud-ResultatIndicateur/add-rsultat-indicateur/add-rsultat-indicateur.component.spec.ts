import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRsultatIndicateurComponent } from './add-rsultat-indicateur.component';

describe('AddRsultatIndicateurComponent', () => {
  let component: AddRsultatIndicateurComponent;
  let fixture: ComponentFixture<AddRsultatIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRsultatIndicateurComponent]
    });
    fixture = TestBed.createComponent(AddRsultatIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
