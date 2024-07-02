import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContexteComponent } from './detail-contexte.component';

describe('DetailContexteComponent', () => {
  let component: DetailContexteComponent;
  let fixture: ComponentFixture<DetailContexteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailContexteComponent]
    });
    fixture = TestBed.createComponent(DetailContexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
