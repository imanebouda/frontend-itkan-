import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/AuditServices/question.service';

@Component({
  selector: 'app-update-check-list',
  templateUrl: './update-check-list.component.html',
  styleUrls: ['./update-check-list.component.scss']
})
export class UpdateCheckListComponent implements OnInit {
  @Input() selectedCheckList: QuestionModel;
  @Output() closeUpdateDialog = new EventEmitter<void>();
  
  updateCheckListForm: FormGroup;
  is_loading = false;
  errorMessage: string = '';
  typeCheckListOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {
    this.updateCheckListForm = this.fb.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      typechecklist_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.selectedCheckList) {
      this.updateCheckListForm.patchValue({
        name: this.selectedCheckList.name,
        niveau: this.selectedCheckList.niveau,
        code: this.selectedCheckList.code,
        description: this.selectedCheckList.description,
        typechecklist_id: this.selectedCheckList.typechecklist_id,
      });
    }
    this.loadTypeCheckLists();
  }

  loadTypeCheckLists(): void {
    this.questionService.getTypeQuestions().subscribe(
      typeQuestions => {
        this.typeCheckListOptions = typeQuestions;
      },
      error => {
        console.error('Error fetching type questions:', error);
      }
    );
  }

  submitForm() {
    if (this.updateCheckListForm.valid) {
      this.is_loading = true;
      const formData = this.updateCheckListForm.value;

      // Convertir les valeurs en nombres
      const typechecklistId = parseInt(formData.typechecklist_id, 10); // Convertir l'identifiant en nombre entier
      const typeCheckListAuditId = typechecklistId; // Utiliser le même identifiant pour typeCheckListAuditId
      const typeCheckListAuditType = formData.typechecklist_id; // Utiliser directement la valeur de typechecklist_id pour le type

      // Créer un objet conforme à la structure de la requête envoyée par Swagger
      const requestBody = {
        id: this.selectedCheckList.id,
        name: formData.name,
        niveau: formData.niveau,
        code: formData.code,
        description: formData.description,
        typechecklist_id: formData.typechecklist_id, // Utiliser l'identifiant converti
      };

      this.questionService.updateQuestion(this.selectedCheckList.id, requestBody).subscribe(
        () => {
          this.is_loading = false;
          this.closeUpdateDialog.emit();
        },
        error => {
          this.is_loading = false;
          this.errorMessage = 'Error updating question: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Invalid form!';
      console.log(this.updateCheckListForm);
    }
  }

  closeDialog() {
    this.closeUpdateDialog.emit(); // Emit event to close the dialog
  }
}
