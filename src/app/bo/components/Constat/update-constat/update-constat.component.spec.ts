import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConstatComponent } from './update-constat.component';

describe('UpdateConstatComponent', () => {
  let component: UpdateConstatComponent;
  let fixture: ComponentFixture<UpdateConstatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateConstatComponent]
    });
    fixture = TestBed.createComponent(UpdateConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
