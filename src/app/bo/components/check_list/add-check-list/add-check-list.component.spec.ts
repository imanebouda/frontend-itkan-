import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChecklistComponent } from './add-check-list.component';

describe('AddCheckListComponent', () => {
  let component: AddChecklistComponent;
  let fixture: ComponentFixture<AddChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChecklistComponent]
    });
    fixture = TestBed.createComponent(AddChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
