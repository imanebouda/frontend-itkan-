import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsListComponent } from './list-reclamations.component';

describe('ListReclamationsComponent', () => {
  let component: ReclamationsListComponent;
  let fixture: ComponentFixture<ReclamationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationsListComponent]
    });
    fixture = TestBed.createComponent(ReclamationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
