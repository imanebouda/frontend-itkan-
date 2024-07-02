import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategorieComponent } from './update-categorie.component';

describe('UpdateCategorieComponent', () => {
  let component: UpdateCategorieComponent;
  let fixture: ComponentFixture<UpdateCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCategorieComponent]
    });
    fixture = TestBed.createComponent(UpdateCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
