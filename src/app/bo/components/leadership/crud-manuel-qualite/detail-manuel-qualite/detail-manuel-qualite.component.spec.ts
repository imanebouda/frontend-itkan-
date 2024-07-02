import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailManuelQualiteComponent } from './detail-manuel-qualite.component';

describe('DetailManuelQualiteComponent', () => {
  let component: DetailManuelQualiteComponent;
  let fixture: ComponentFixture<DetailManuelQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailManuelQualiteComponent]
    });
    fixture = TestBed.createComponent(DetailManuelQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
