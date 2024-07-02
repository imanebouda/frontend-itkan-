import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/AuditServices/question.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-check-list',
  templateUrl: './add-check-list.component.html',
  styleUrls: ['./add-check-list.component.scss']
})
export class AddCheckListComponent implements OnInit {
  @Input() addQuestion: QuestionModel;
  @Output() closeAddDialog = new EventEmitter<void>();
 
  addCheckListForm: FormGroup;
  is_loading = false;
  errorMessage: string = '';
  typeCheckListOptions: any[] = [];

  @ViewChild('addModal') addModal: ElementRef;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {
    this.addCheckListForm = this.fb.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      typechecklist_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTypeCheckLists();
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
          this.errorMessage = 'Error adding checklist: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Invalid form!';
    }
  }
}
