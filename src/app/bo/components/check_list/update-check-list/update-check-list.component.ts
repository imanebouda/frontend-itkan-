import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistModel } from 'src/app/models/check_list.model';
import { ChecklistService } from 'src/app/services/AuditServices/check-list.service';
import { ProcessusService } from 'src/app/services/AuditServices/processus.service';
import { SmqService } from 'src/app/services/AuditServices/smq.service';

@Component({
    selector: 'app-update-checklist',
    templateUrl: './update-check-list.component.html',
    styleUrls: ['./update-check-list.component.scss']
})
export class UpdateChecklistComponent implements OnInit, OnChanges {
    @Input() selectedChecklist: ChecklistModel;
    @Output() closeUpdateDialog = new EventEmitter<void>();
    updateChecklistForm: FormGroup;
    is_loading = false;
    errorMessage: string = '';
    typeAuditOptions: any[] = [];
    processusOptions: any[] = [];
    smqOptions: any[] = [];

    constructor(
        private fb: FormBuilder,
        private checklistService: ChecklistService,
        private processusService: ProcessusService,
        private smqService: SmqService
    ) {
        this.updateChecklistForm = this.fb.group({
            typeAuditId: ['', Validators.required],
            processusID: ['', Validators.required],
            smQ_ID: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadOptions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedChecklist && this.selectedChecklist) {
            this.patchFormWithSelectedChecklist();
        }
    }

    loadOptions(): void {
        this.loadTypeAudits();
        this.loadProcessus();
        this.loadSmqOptions();
    }

    loadTypeAudits(): void {
        this.checklistService.getTypeAudits().subscribe(
            typeAudits => {
                this.typeAuditOptions = typeAudits;
                this.patchFormIfReady(); // Appel pour patcher le formulaire
            },
            error => {
                console.error('Error fetching type audit:', error);
            }
        );
    }

    loadProcessus(): void {
        this.processusService.getProcessusList().subscribe(
            processus => {
                this.processusOptions = processus;
                this.patchFormIfReady(); // Appel pour patcher le formulaire
            },
            error => {
                console.error('Error fetching processus:', error);
            }
        );
    }

    loadSmqOptions(): void {
        this.smqService.getSmqList().subscribe(
            smqOptions => {
                this.smqOptions = smqOptions;
                this.patchFormIfReady(); // Appel pour patcher le formulaire
            },
            error => {
                console.error('Error fetching SMQ options:', error);
            }
        );
    }

    patchFormIfReady(): void {
        if (this.typeAuditOptions.length && this.processusOptions.length && this.smqOptions.length && this.selectedChecklist) {
            this.patchFormWithSelectedChecklist();
        }
    }

    patchFormWithSelectedChecklist(): void {
        console.log('Patching form with:', this.selectedChecklist); // Ajoutez ceci pour déboguer
        this.updateChecklistForm.patchValue({
            typeAuditId: this.selectedChecklist.typeAudit.id,
            processusID: this.selectedChecklist.processus.id,
            smQ_ID: this.selectedChecklist.smq.id
        });
    }

    submitForm() {
        if (this.updateChecklistForm.valid) {
            this.is_loading = true;
            const formData = this.updateChecklistForm.value;

            const requestBody = {
                id: this.selectedChecklist.id,
                typeAuditId: formData.typeAuditId,
                typeAuditType: this.selectedChecklist.typeAudit.type,
                processusID: formData.processusID,
                smQ_ID: formData.smQ_ID,
            };

            this.checklistService.updateChecklist(this.selectedChecklist.id, requestBody).subscribe(
                () => {
                    this.is_loading = false;
                    this.closeUpdateDialog.emit();
                },
                error => {
                    this.is_loading = false;
                    this.errorMessage = 'Error updating checklist: ' + error.message;
                }
            );
        } else {
            this.errorMessage = 'Invalid form!';
        }
    }

    closeDialog() {
        this.closeUpdateDialog.emit();
    }
}
