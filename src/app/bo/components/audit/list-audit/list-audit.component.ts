import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuditModel } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/AuditServices/audit.service';
import { Modal } from 'bootstrap';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-list-audit',
    templateUrl: './list-audit.component.html',
    styleUrls: ['./list-audit.component.scss']
})
export class ListAuditComponent implements OnInit {
    showDialog: boolean = false; // Propriété pour contrôler l'affichage du dialogue

    options: any[] = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ];
    selectedOption: string;

    audits: AuditModel[] = [];
    userAuditeur: any[] = [];
    is_loading: boolean = true;
    formulaireRecherche: FormGroup;
    typeAuditList: { label: string; value: number }[] = [];
    selectedAudit: AuditModel;
    addAudit: AuditModel;

    @ViewChild('updateModal') updateModal: ElementRef;
    @ViewChild('addModal') addModal: ElementRef;

    constructor(
        private auditService: AuditService, 
        private http: HttpClient      
    ) {}
    ngOnInit(): void {
        this.getAllAuditeur();
        this.initializeForm();
        this.loadAudits();
        this.loadTypeAudits();
        this.http.get<string[]>('https://localhost:44305/Dropdown/options')
            .subscribe(options => this.options = options);
    }

    initializeForm(): void {
        this.formulaireRecherche = new FormGroup({
            typeAudit: new FormControl('')
        });
    }

    loadAudits(): void {
        this.auditService.getAuditList().subscribe(
            audits => {
                this.audits = audits;
                this.is_loading = false;
            },
            error => {
                console.error('Error fetching Audits:', error);
                this.is_loading = false;
            }
        );
        console.log("ggggg",this.userAuditeur);
    }

    loadTypeAudits(): void {
        this.auditService.getTypeAudits().subscribe(
            typeAudits => {
                this.typeAuditList = typeAudits.map(ta => ({ label: ta.type, value: ta.id }));
            },
            error => {
                console.error('Error fetching type audits:', error);
            }
        );
    }

    searchAudits(): void {
        const typeAuditId = this.formulaireRecherche.get('typeAudit')?.value;
        if (typeAuditId) {
            this.is_loading = true;
            this.auditService.searchAuditsByType(typeAuditId).subscribe(
                audits => {
                    this.audits = audits;
                    this.is_loading = false;
                },
                error => {
                    console.error('Error searching audits:', error);
                    this.is_loading = false;
                }
            );
        } else {
            this.loadAudits();
        }
    }

    clearSearch(): void {
        this.formulaireRecherche.reset();
        this.loadAudits();
    }

    deleteAudit(auditData: AuditModel): void {
        this.auditService.deleteAudit(auditData.id).subscribe(
            response => {
                console.log('Audit deleted successfully', response);
                this.loadAudits(); // Refresh the list after deletion
            },
            error => {
                console.error('Error deleting Audit', error);
            }
        );
        
    }

    openUpdateDialog(audit: AuditModel): void {
        console.log('Selected audit:', audit);
        this.selectedAudit = audit;
        const modal = new Modal(this.updateModal.nativeElement);
        modal.show();
    }

    openAddAuditModal(): void {
        console.log('Add audit:');
        const modal = new Modal(this.addModal.nativeElement);
        modal.show();
    }

    closeUpdateDialog(): void {
        const modal = Modal.getInstance(this.updateModal.nativeElement);
        modal.hide();
        this.selectedAudit = null;
    }

    closeAddDialog(): void {
        const modal = Modal.getInstance(this.addModal.nativeElement);
        modal.hide();
    }
    getAllAuditeur(): void {
        this.auditService.GetAllAuditeur().subscribe(
            (res: any) => {
                if (res) {
                    this.userAuditeur = res;
                }
            },
            (error: any) => {
                console.error('Erreur lors de la récupération des auditeurs', error);
            }
        );
        
    }
}
