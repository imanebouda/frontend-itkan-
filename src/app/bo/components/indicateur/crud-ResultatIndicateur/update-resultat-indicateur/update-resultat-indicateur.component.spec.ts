import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResultatIndicateurComponent } from './update-resultat-indicateur.component';

describe('UpdateResultatIndicateurComponent', () => {
  let component: UpdateResultatIndicateurComponent;
  let fixture: ComponentFixture<UpdateResultatIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateResultatIndicateurComponent]
    });
    fixture = TestBed.createComponent(UpdateResultatIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
