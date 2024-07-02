import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManuelQualiteComponent } from './add-manuel-qualite.component';

describe('AddManuelQualiteComponent', () => {
  let component: AddManuelQualiteComponent;
  let fixture: ComponentFixture<AddManuelQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddManuelQualiteComponent]
    });
    fixture = TestBed.createComponent(AddManuelQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
