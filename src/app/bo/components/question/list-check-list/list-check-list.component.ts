import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/AuditServices/question.service';
import { Modal } from 'bootstrap';
import { HttpClient } from "@angular/common/http";
import { ConstatModel } from 'src/app/models/constat.model';
import { ConstatService } from 'src/app/services/AuditServices/constat.service';
import { TypeContat } from 'src/app/models/type-contat.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-check-list',
  templateUrl: './list-check-list.component.html',
  styleUrls: ['./list-check-list.component.scss']
})
export class ListCheckListComponent implements OnInit {
  showDialog: boolean = false;
  options: any[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];
  selectedOption: string;
  questions: QuestionModel[] = [];
  is_loading: boolean = true;
  formulaireRecherche: FormGroup;
  typeQuestion: { label: string; value: number }[] = [];
 // typeConstat: { label: string; value: number }[] = [];
  typeConstats: TypeContat[] = [];
  selectedCheckList: QuestionModel;
  addChecklist: QuestionModel;
  constatForm: FormGroup;
  checklistAuditId: number;
  typeConstat: any[] = [];
  @ViewChild('updateModal') updateModal: ElementRef;
  @ViewChild('addModal') addModal: ElementRef;
  @ViewChild('constatModal') constatModal: ElementRef;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private constatService: ConstatService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadquestions();
    this.loadTypequestions();
    this.http.get<string[]>('https://localhost:44305/Dropdown/options')
      .subscribe(options => this.options = options);
    this.route.paramMap.subscribe(params => {
      this.checklistAuditId = +params.get('checklistAuditId');
      console.log('checklistAuditId from route:', this.checklistAuditId); // Debug log
      this.getQuestionsByChecklistAuditId(this.checklistAuditId);
    });
    this.loadTypeConstats();
  }

  initializeForm(): void {
    this.formulaireRecherche = new FormGroup({
      typeChecklist: new FormControl('')
    });
    this.constatForm = new FormGroup({
      constat: new FormControl('', Validators.required),
      typeConstatId: new FormControl('', Validators.required)
    });
  }

  loadquestions(): void {
    this.questionService.getQuestion().subscribe(
      questions => {
        this.questions = questions;
        this.is_loading = true;
      },
      error => {
        console.error('Error fetching questions:', error);
        this.is_loading = true;
      }
    );
  }
  
  loadTypeConstats(): void {
    this.constatService.getTypeConstats().subscribe(
      typeConstats => {
        this.typeConstat = typeConstats;
      },
      error => {
        console.error('Error fetching type constats:', error);
      }
    );
  }
  loadTypequestions(): void {
    this.questionService.getTypeQuestions().subscribe(
      typeQuestions => {
        this.typeQuestion = typeQuestions.map(tc => ({ label: tc.type, value: tc.id }));
      },
      error => {
        console.error('Error fetching type questions:', error);
      }
    );
  }

  searchQuestions(): void {
    const typeQuestionId = this.formulaireRecherche.get('typeChecklist')?.value;
    if (typeQuestionId) {
      this.is_loading = true;
      this.questionService.searchQuestionsByType(typeQuestionId).subscribe(
        questions => {
          this.questions = questions;
          this.is_loading = false;
        },
        error => {
          console.error('Error searching questions:', error);
          this.is_loading = false;
        }
      );
    } else {
      this.loadquestions();
    }
  }

  clearSearch(): void {
    this.formulaireRecherche.reset();
    this.loadquestions();
  }

  deleteCheckList(checkListData: QuestionModel): void {
    this.questionService.deleteQuestion(checkListData.id).subscribe(
      response => {
        console.log('Question deleted successfully', response);
        this.loadquestions();
      },
      error => {
        console.error('Error deleting Question', error);
      }
    );
  }

  openUpdateDialog(checkList: QuestionModel): void {
    console.log('Selected Question:', checkList);
    this.selectedCheckList = checkList;
    const modal = new Modal(this.updateModal.nativeElement);
    modal.show();
  }

  openAddCheckListModal(): void {
    console.log('add Question:');
    const modal = new Modal(this.addModal.nativeElement);
    modal.show();
  }

  closeUpdateDialog(): void {
    const modal = Modal.getInstance(this.updateModal.nativeElement);
    modal.hide();
    this.selectedCheckList = null;
  }

  closeAddDialog(): void {
    const modal = Modal.getInstance(this.addModal.nativeElement);
    modal.hide();
  }

  openAffectConstatModal(checkList: QuestionModel): void {
    console.log('Selected Question:', checkList);
    this.selectedCheckList = checkList;
    const modal = new Modal(this.constatModal.nativeElement);
    modal.show();
    console.log(this.selectedCheckList);
  }

  saveConstat(): void {
    if (this.constatForm.valid) {
      const newConstat: ConstatModel = {
        //ID: 0,
        constat: this.constatForm.get('constat')?.value,
        typeConstatId: this.constatForm.get('typeConstatId')?.value,
        checklistId: this.selectedCheckList.id,
        typeConstat: null,
        question: null
      };
      this.constatService.createConstat(newConstat).subscribe(
        response => {
          console.log('Constat created successfully', response);
          this.closeAffectConstatModal();
        },
        error => {
          console.error('Error creating Constat', error);
        }
      );
      console.log("this is :"+newConstat);
    }
  }

  closeAffectConstatModal(): void {
    if (this.constatModal && this.constatModal.nativeElement) {
      const modal = Modal.getInstance(this.constatModal.nativeElement);
      if (modal) {
        modal.hide();
      } else {
        console.error('constatModal instance is not defined');
      }
      this.selectedCheckList = null;
    }
  }

  getQuestionsByChecklistAuditId(checklistAuditId: number): void {
    this.is_loading = true;
    console.log('Fetching questions for checklistAuditId:', checklistAuditId); // Debug log
    this.questionService.getQuestionsByChecklistAuditId(checklistAuditId).subscribe(
      questions => {
        console.log('Questions fetched successfully:', questions); // Debug log
        this.questions = questions;
        this.is_loading = false;
      },
      error => {
        console.error('Error fetching questions:', error);
        this.is_loading = false;
      }
    );
  }
}
