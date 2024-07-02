import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuestionModel } from 'src/app/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = `${environment.API_BASE_URL_GENERAL}ChecklistAudit`;
  private typeChecklistUrl = `${environment.API_BASE_URL_GENERAL}TypeCheckListAudit`;

  constructor(private http: HttpClient) {}

  getQuestion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addQuestion(newQuestion: any): Observable<any> {
    const typeQuestionId = newQuestion.typechecklist_id ? newQuestion.typechecklist_id : null;
    const typeQuestionType = newQuestion.typeQuestion ? newQuestion.typeQuestion.type : null;
    
    // Créer un objet avec les données mises à jour, y compris typeCheckListAudit
    const addData = {
      name: newQuestion.name,
      niveau: newQuestion.niveau,
      code: newQuestion.code,
      description: newQuestion.description,
      typechecklist_id: typeQuestionId,
      typeCheckListAudit: { // Ajouter les données du typeCheckListAudit
        id: typeQuestionId,
        type: "string"
      }
    };
  
    // Envoyer la requête PUT avec les données mises à jour
    return this.http.post<any>(`${this.apiUrl}`, addData, this.httpOptions).pipe(
      catchError(this.handleError)
    );
    //-------------------
    /*return this.http.post<any>(this.apiUrl, newQuestion, this.httpOptions).pipe(
      catchError(this.handleError)
    );*/
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editQuestion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateQuestion(id: number, updatedQuestion: any): Observable<any> {
    // Extraire l'ID et le type du typeCheckListAudit du formulaire mis à jour
    const typeQuestionId = updatedQuestion.typechecklist_id ? updatedQuestion.typechecklist_id : null;
    const typeQuestionType = updatedQuestion.typeCheckListAudit ? updatedQuestion.typeCheckListAudit.type : null;
    
    // Créer un objet avec les données mises à jour, y compris typeCheckListAudit
    const updatedData = {
      id: updatedQuestion.id,
      name: updatedQuestion.name,
      niveau: updatedQuestion.niveau,
      code: updatedQuestion.code,
      description: updatedQuestion.description,
      typechecklist_id: typeQuestionId,
      typeCheckListAudit: { // Ajouter les données du typeCheckListAudit
        id: typeQuestionId,
        type: "string"
      }
    };
    // Envoyer la requête PUT avec les données mises à jour
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getTypeQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.typeChecklistUrl).pipe(
      catchError(this.handleError)
    );
  }

  searchQuestionsByType(typeChecklistId: number): Observable<any[]> {
    const params = new HttpParams().set('typeChecklistId', typeChecklistId.toString());
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  getQuestionsByChecklistAuditId(checklistAuditId: number): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.apiUrl}/GetCheckListAuditsByCheckListId/${checklistAuditId}`);
  }
}
