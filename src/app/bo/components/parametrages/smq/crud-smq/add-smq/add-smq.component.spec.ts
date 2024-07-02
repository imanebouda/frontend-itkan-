import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmqComponent } from './add-smq.component';

describe('AddSmqComponent', () => {
  let component: AddSmqComponent;
  let fixture: ComponentFixture<AddSmqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSmqComponent]
    });
    fixture = TestBed.createComponent(AddSmqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
