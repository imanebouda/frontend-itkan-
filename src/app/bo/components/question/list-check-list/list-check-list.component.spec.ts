import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckListComponent } from './list-check-list.component';

describe('ListCheckListComponent', () => {
  let component: ListCheckListComponent;
  let fixture: ComponentFixture<ListCheckListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCheckListComponent]
    });
    fixture = TestBed.createComponent(ListCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
