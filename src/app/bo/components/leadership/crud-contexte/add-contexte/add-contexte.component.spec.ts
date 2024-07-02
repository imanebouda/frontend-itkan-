import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContexteComponent } from './add-contexte.component';

describe('AddContexteComponent', () => {
  let component: AddContexteComponent;
  let fixture: ComponentFixture<AddContexteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContexteComponent]
    });
    fixture = TestBed.createComponent(AddContexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
