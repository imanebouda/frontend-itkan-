import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProcessusComponent } from './update-processus.component';

describe('UpdateProcessusComponent', () => {
  let component: UpdateProcessusComponent;
  let fixture: ComponentFixture<UpdateProcessusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProcessusComponent]
    });
    fixture = TestBed.createComponent(UpdateProcessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
