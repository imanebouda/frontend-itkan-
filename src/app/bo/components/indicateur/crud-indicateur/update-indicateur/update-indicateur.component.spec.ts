import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIndicateurComponent } from './update-indicateur.component';

describe('UpdateIndicateurComponent', () => {
  let component: UpdateIndicateurComponent;
  let fixture: ComponentFixture<UpdateIndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateIndicateurComponent]
    });
    fixture = TestBed.createComponent(UpdateIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
