import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContexteComponent } from './list-contexte.component';

describe('ListContexteComponent', () => {
  let component: ListContexteComponent;
  let fixture: ComponentFixture<ListContexteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContexteComponent]
    });
    fixture = TestBed.createComponent(ListContexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
