import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChecklistModel } from 'src/app/models/check_list.model';
import { TypeAuditModel } from 'src/app/models/type-audit.model';

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {
    private apiUrl = 'https://localhost:44305/api/Check_list';
    private apiUrl1 = 'https://localhost:44305/api';
    private typeAuditUrl = `${environment.API_BASE_URL_GENERAL}TypeAudit`;

    constructor(private http: HttpClient) { }

    getChecklistList(): Observable<ChecklistModel[]> {
        return this.http.get<ChecklistModel[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }
    
    addChecklist(newChecklist: any): Observable<any> {
        const addData = {
            typeAuditId: newChecklist.typeAuditId,
            /*typeAudit: {
                id: newChecklist.typeAuditId,
                type: "string"
            },*/
            smQ_ID: newChecklist.smQ_ID,
            /* smq: {
                id: newChecklist.smQ_ID,
                libelle: "string"
            },*/
            processusID: newChecklist.processusID,
           /*  processus: {
                id: newChecklist.processusID,
                code: "string"
            }*/
        };

        return this.http.post<any>(`${this.apiUrl}`, addData, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deleteChecklist(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getTypeAudits(): Observable<TypeAuditModel[]> {
        return this.http.get<TypeAuditModel[]>(this.typeAuditUrl).pipe(
            catchError(this.handleError)
        );
    }

    searchChecklistsByType(typeAuditId: number): Observable<ChecklistModel[]> {
        const params = new HttpParams().set('typeAuditId', typeAuditId.toString());
        return this.http.get<ChecklistModel[]>(`${this.apiUrl}/search`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    updateChecklist(id: number, updatedChecklist: any): Observable<any> {
        const updatedData = {
            typeAuditId: updatedChecklist.typeAuditId,
          /*  typeAudit: {
                id: updatedChecklist.typeAuditId,
                type: updatedChecklist.typeAuditType
            },*/
            smQ_ID: updatedChecklist.smQ_ID,
           /* smq: {
                id: updatedChecklist.smQ_ID,
                libelle: updatedChecklist.smq.libelle
            },*/
            processusID: updatedChecklist.processusID,
           /* processus: {
                id: updatedChecklist.processusID,
                code: updatedChecklist.processus.code
            }*/
        };

        return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData, this.httpOptions).pipe(
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
  /*   getChecklistsByChecklistId(checklistId: number): Observable<ChecklistModel[]> {
      return this.http.get<ChecklistModel[]>(`${this.apiUrl1}/ChecklistAudit/GetCheckListAuditsByCheckListId/${checklistId}`);
    }*/
}
