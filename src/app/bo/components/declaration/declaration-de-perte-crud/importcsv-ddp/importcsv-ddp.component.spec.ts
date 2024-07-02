import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportcsvDdpComponent } from './importcsv-ddp.component';

describe('ImportcsvDdpComponent', () => {
  let component: ImportcsvDdpComponent;
  let fixture: ComponentFixture<ImportcsvDdpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportcsvDdpComponent]
    });
    fixture = TestBed.createComponent(ImportcsvDdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
