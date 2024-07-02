import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePolitiqueQualiteComponent } from './update-politique-qualite.component';

describe('UpdatePolitiqueQualiteComponent', () => {
  let component: UpdatePolitiqueQualiteComponent;
  let fixture: ComponentFixture<UpdatePolitiqueQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePolitiqueQualiteComponent]
    });
    fixture = TestBed.createComponent(UpdatePolitiqueQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
