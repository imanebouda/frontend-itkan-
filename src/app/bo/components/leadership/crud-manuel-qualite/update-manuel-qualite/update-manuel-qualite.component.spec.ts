import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManuelQualiteComponent } from './update-manuel-qualite.component';

describe('UpdateManuelQualiteComponent', () => {
  let component: UpdateManuelQualiteComponent;
  let fixture: ComponentFixture<UpdateManuelQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateManuelQualiteComponent]
    });
    fixture = TestBed.createComponent(UpdateManuelQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
