import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChecklistModel } from 'src/app/models/check_list.model';
import { ChecklistService } from 'src/app/services/AuditServices/check-list.service';
import { ProcessusService } from 'src/app/services/AuditServices/processus.service';
import { SmqService } from 'src/app/services/AuditServices/smq.service';
import { Modal } from 'bootstrap';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-add-checklist',
    templateUrl: './add-check-list.component.html',
    styleUrls: ['./add-check-list.component.scss']
})
export class AddChecklistComponent implements OnInit {
    @Input() addChecklist: ChecklistModel;
    @Output() closeAddDialog = new EventEmitter<void>();
    @Output() checklistAdded = new EventEmitter<void>();
    typeAuditOptions: any[] = [];
    addChecklistForm: FormGroup;
    is_loading = false;
    errorMessage: string = '';
    processusOptions: any[] = [];
    smqOptions: any[] = [];
    @ViewChild('addChecklistModal') addModal: ElementRef;

    constructor(
        private fb: FormBuilder,
        private checklistService: ChecklistService,
        private processusService: ProcessusService,
        private smqService: SmqService
    ) {
        this.addChecklistForm = this.fb.group({
            typeAuditId: ['', Validators.required],
            processusID: ['', Validators.required],
            smQ_ID: ['', Validators.required],
           // description: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.loadTypeAudits();
        this.loadProcessus();
        this.loadSmqOptions();
    }

    loadTypeAudits(): void {
        this.checklistService.getTypeAudits().subscribe(
            typeAudits => {
                this.typeAuditOptions = typeAudits;
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
            },
            error => {
                console.error('Error fetching SMQ options:', error);
            }
        );
    }

    submitForm() {
        if (this.addChecklistForm.valid) {
            this.is_loading = true;
            const formData = this.addChecklistForm.value;

            this.checklistService.addChecklist(formData).subscribe(
                () => {
                    this.is_loading = false;
                    this.checklistAdded.emit();
                    this.closeAddDialog.emit();
                    const modal = new Modal(this.addModal.nativeElement);
                    modal.hide();
                },
                error => {
                    this.is_loading = false;
                    this.errorMessage = 'Error adding checklist: ' + error.message;
                }
            );
        } else {
            this.errorMessage = 'Invalid form!';
        }
    }
}
