import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConstatComponent } from './list-constat.component';

describe('ListConstatComponent', () => {
  let component: ListConstatComponent;
  let fixture: ComponentFixture<ListConstatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListConstatComponent]
    });
    fixture = TestBed.createComponent(ListConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
