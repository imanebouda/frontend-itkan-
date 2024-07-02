import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChecklistComponent } from './update-check-list.component';

describe('UpdateCheckListComponent', () => {
  let component: UpdateChecklistComponent;
  let fixture: ComponentFixture<UpdateChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateChecklistComponent]
    });
    fixture = TestBed.createComponent(UpdateChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
