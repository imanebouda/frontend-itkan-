import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolitiqueQualiteComponent } from './add-politique-qualite.component';

describe('AddPolitiqueQualiteComponent', () => {
  let component: AddPolitiqueQualiteComponent;
  let fixture: ComponentFixture<AddPolitiqueQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPolitiqueQualiteComponent]
    });
    fixture = TestBed.createComponent(AddPolitiqueQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
