import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChecklistModel } from 'src/app/models/check_list.model';
import { ChecklistService } from 'src/app/services/AuditServices/check-list.service';
import { Modal } from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-checklist',
  templateUrl: './list-check-list.component.html',
  styleUrls: ['./list-check-list.component.scss']
})
export class ListChecklistComponent implements OnInit {
  showDialog: boolean = false;

  options: any[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];
  selectedOption: string;

  checklists: ChecklistModel[] = [];
  is_loading: boolean = true;
  formulaireRecherche: FormGroup;
  typeAuditList: { label: string; value: number }[] = [];
  selectedChecklist: ChecklistModel;
  addChecklist: ChecklistModel;
  selectedChecklistId: number;
  @ViewChild('updateModal') updateModal: ElementRef;
  @ViewChild('addModal') addModal: ElementRef;

  constructor(private http: HttpClient, private checklistService: ChecklistService,private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadChecklists();
    this.loadTypeAudits();
    this.http.get<any[]>('https://localhost:44305/Dropdown/options').subscribe(
      options => this.options = options,
      error => console.error('Error fetching dropdown options:', error)
    );
  }

  initializeForm(): void {
    this.formulaireRecherche = new FormGroup({
      typeAudit: new FormControl('')
    });
  }

  loadChecklists(): void {
    this.checklistService.getChecklistList().subscribe(
      checklists => {
        this.checklists = checklists;
        this.is_loading = false;
      },
      error => {
        console.error('Error fetching Checklists:', error);
        this.is_loading = false;
      }
    );
  }

  loadTypeAudits(): void {
    this.checklistService.getTypeAudits().subscribe(
      typeAudits => {
        this.typeAuditList = typeAudits.map(ta => ({ label: ta.type, value: ta.id }));
      },
      error => {
        console.error('Error fetching type audits:', error);
      }
    );
  }

  searchChecklists(): void {
    const typeAuditId = this.formulaireRecherche.get('typeAudit')?.value;
    if (typeAuditId) {
      this.is_loading = true;
      this.checklistService.searchChecklistsByType(typeAuditId).subscribe(
        checklists => {
          this.checklists = checklists;
          this.is_loading = false;
        },
        error => {
          console.error('Error searching checklists:', error);
          this.is_loading = false;
        }
      );
    } else {
      this.loadChecklists();
    }
  }

  clearSearch(): void {
    this.formulaireRecherche.reset();
    this.loadChecklists();
  }

  deleteChecklist(checklistData: ChecklistModel): void {
    this.checklistService.deleteChecklist(checklistData.id).subscribe(
      response => {
        console.log('Checklist deleted successfully', response);
        this.loadChecklists(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting Checklist', error);
      }
    );
  }

  openUpdateDialog(checklist: ChecklistModel): void {
    this.selectedChecklist = checklist;
    const modal = new Modal(this.updateModal.nativeElement);
    modal.show();
  }

  closeUpdateDialog(): void {
    const modal = Modal.getInstance(this.updateModal.nativeElement);
    modal.hide();
    this.selectedChecklist = null;
    this.loadChecklists();
  }

  openAddChecklistModal(): void {
    console.log('Add checklist:');
    const modal = new Modal(this.addModal.nativeElement);
    modal.show();
  }

  closeAddDialog(): void {
    const modal = Modal.getInstance(this.addModal.nativeElement);
    modal.hide();
  }
  navigateToChecklist(checklistId: number): void {
    console.log('Navigating to Checklist with typeAuditId:', checklistId);
    if (checklistId !== undefined && checklistId !== null) {
      this.router.navigate(['/listCheckList', checklistId]);
    } else {
      console.error('Invalid typeAuditId:', checklistId);
    }
  }
  
  
}
