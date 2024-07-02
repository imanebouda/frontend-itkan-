import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIndicateurComponent } from './detail-indicateur.component';

describe('DetailIndicateurComponent', () => {
  let component: DetailIndicateurComponent;
  let fixture: ComponentFixture<DetailIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailIndicateurComponent]
    });
    fixture = TestBed.createComponent(DetailIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
