import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/AuditServices/question.service';
import { Modal } from 'bootstrap';
import { SmqService } from 'src/app/services/AuditServices/smq.service';
@Component({
  selector: 'app-add-check-list',
  templateUrl: './add-check-list.component.html',
  styleUrls: ['./add-check-list.component.scss']
})
export class AddCheckListComponent implements OnInit {
  addCheckListForm: FormGroup;
  is_loading = false;
  errorMessage: string = '';
  typeCheckListOptions: any[] = [];
  listSMQ: any[] = [];

  @ViewChild('addModal') addModal: ElementRef;
  @Input() addQuestion: QuestionModel;
  @Output() closeAddDialog = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private smqService: SmqService
  ) {
    this.addCheckListForm = this.fb.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      typechecklist_id: [null, Validators.required],
      CheckListAuditId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTypeCheckLists();
    this.loadSMQ();
  }

  loadTypeCheckLists(): void {
    this.questionService.getTypeQuestions().subscribe(
      typeQuestions => {
        this.typeCheckListOptions = typeQuestions;
      },
      error => {
        console.error('Error fetching type Questions:', error);
      }
    );
  }
  loadSMQ(): void {
    this.smqService.getSmqList().subscribe(
      SMQ => {
        this.listSMQ = SMQ;
      },
      error => {
        console.error('Error fetching smq', error);
      }
    );
  }

  submitForm() {
    if (this.addCheckListForm.valid) {
      this.is_loading = true;
      const formData = this.addCheckListForm.value;

      this.questionService.addQuestion(formData).subscribe(
        () => {
          this.is_loading = false;
          this.closeAddDialog.emit();
          const modal = new Modal(this.addModal.nativeElement);
          modal.hide();
        },
        error => {
          this.is_loading = false;
          this.errorMessage = 'Error adding question: ' + error.message;
          console.error('Error adding question:', error);
        }
      );
    }
  }

  closeDialog() {
    this.closeAddDialog.emit();
    const modal = Modal.getInstance(this.addModal.nativeElement);
    modal.hide();
  }
}
