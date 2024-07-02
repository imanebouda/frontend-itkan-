import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRsultatIndicateurComponent } from './list-rsultat-indicateur.component';

describe('ListRsultatIndicateurComponent', () => {
  let component: ListRsultatIndicateurComponent;
  let fixture: ComponentFixture<ListRsultatIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRsultatIndicateurComponent]
    });
    fixture = TestBed.createComponent(ListRsultatIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
