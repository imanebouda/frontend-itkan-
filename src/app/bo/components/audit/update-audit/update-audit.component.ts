import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditModel } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/AuditServices/audit.service';
@Component({
    selector: 'app-update-audit',
    templateUrl: './update-audit.component.html',
    styleUrls: ['./update-audit.component.scss']
})

export class UpdateAuditComponent implements OnInit {
    @Input() selectedAudit: AuditModel;
    @Output() closeUpdateDialog = new EventEmitter<void>();
    updateAuditForm: FormGroup;
    is_loading = false;
    errorMessage: string = '';
    userAuditeur: any[] = [];
    typeAuditOptions: any[] = [];
    statusOptions: string[] = AuditModel.statusOptions;
    constructor(
        private fb: FormBuilder,
        private auditService: AuditService
    ) {
        this.updateAuditForm = this.fb.group({
            auditor_id: ['', Validators.required],
            dateAudit: ['', Validators.required],
            status: ['', Validators.required],
            description: ['', Validators.required],
            typeAuditId: [null, Validators.required],
            typeAudit: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.getAllAuditeur();
        if (this.selectedAudit) {
            this.updateAuditForm.patchValue(this.selectedAudit);
        }
        this.loadTypeAudits();
    }

    loadTypeAudits(): void { console.log("nta hna")
        this.auditService.getTypeAudits().subscribe(
            typeAudits => {
                this.typeAuditOptions = typeAudits;
            },
            error => {
                console.error('Error fetching type audits:', error);
            }
        );
    }

    submitForm() {
        if (this.updateAuditForm.valid) {
            this.is_loading = true;
            const formData = this.updateAuditForm.value;

            // Convertir les valeurs en nombres
            const typeAuditId = parseInt(formData.typeAuditId, 10); // Convertir l'identifiant en nombre entier
            const typeAuditType = formData.typeAuditId; // Utiliser directement la valeur de typeAuditId pour le type

            // Créer un objet conforme à la structure de la requête envoyée par Swagger
            const requestBody = {
                id: this.selectedAudit.id,
                auditor_id:formData.auditor_id,
                dateAudit: formData.dateAudit,
                status: formData.status,
                description: formData.description,
                typeAuditId: typeAuditId, // Utiliser l'identifiant converti
                /*typeAudit: {
                  id: formData.typeAuditId,
                  type: typeAuditType // Utiliser directement la valeur de typeAuditId
                }*/
            };

            console.log("Audit ID:", typeAuditId);
            console.log("Audit Type:", typeAuditType);

            this.auditService.updateAudit(this.selectedAudit.id, requestBody).subscribe(
                () => {
                    this.is_loading = false;
                    this.closeUpdateDialog.emit();
                },
                error => {
                    this.is_loading = false;
                    this.errorMessage = 'Error updating audit: ' + error.message;
                }
            );
        } else {
            this.errorMessage = 'Invalid form!';
            console.log(this.updateAuditForm);
        }
        
    }

    closeDialog() {
        this.closeUpdateDialog.emit(); // Emit event to close the dialog
    }

    // Méthode pour mettre à jour les champs typeAuditId et typeAudit.id simultanément
    updateTypeAudit(event: any) {
        const selectedTypeId = event.target.value;
        this.updateAuditForm.patchValue({
            typeAuditId: selectedTypeId,
            typeAudit: { id: selectedTypeId }
        });
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
