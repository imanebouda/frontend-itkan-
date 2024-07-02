import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRsultatIndicateurComponent } from './detail-rsultat-indicateur.component';

describe('DetailRsultatIndicateurComponent', () => {
  let component: DetailRsultatIndicateurComponent;
  let fixture: ComponentFixture<DetailRsultatIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailRsultatIndicateurComponent]
    });
    fixture = TestBed.createComponent(DetailRsultatIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
