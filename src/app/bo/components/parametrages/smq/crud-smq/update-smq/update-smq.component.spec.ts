import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSmqComponent } from './update-smq.component';

describe('UpdateSmqComponent', () => {
  let component: UpdateSmqComponent;
  let fixture: ComponentFixture<UpdateSmqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSmqComponent]
    });
    fixture = TestBed.createComponent(UpdateSmqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
