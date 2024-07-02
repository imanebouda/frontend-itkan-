import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContexteComponent } from './update-contexte.component';

describe('UpdateContexteComponent', () => {
  let component: UpdateContexteComponent;
  let fixture: ComponentFixture<UpdateContexteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateContexteComponent]
    });
    fixture = TestBed.createComponent(UpdateContexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
