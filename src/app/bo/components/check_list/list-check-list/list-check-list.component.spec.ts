import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChecklistComponent } from './list-check-list.component';

describe('ListCheckListComponent', () => {
  let component: ListChecklistComponent;
  let fixture: ComponentFixture<ListChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListChecklistComponent]
    });
    fixture = TestBed.createComponent(ListChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
