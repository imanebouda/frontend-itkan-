import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPolitiqueQualiteComponent } from './detail-politique-qualite.component';

describe('DetailPolitiqueQualiteComponent', () => {
  let component: DetailPolitiqueQualiteComponent;
  let fixture: ComponentFixture<DetailPolitiqueQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPolitiqueQualiteComponent]
    });
    fixture = TestBed.createComponent(DetailPolitiqueQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
