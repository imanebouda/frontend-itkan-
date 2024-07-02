import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {AuditModel} from "../../models/audit.model";
import { UsersModel } from 'src/app/models/users.model';
@Injectable({
    providedIn: 'root'
})
export class AuditService {
    private apiUrl = `${environment.API_BASE_URL_GENERAL}Audit`;
    private typeAuditUrl = `${environment.API_BASE_URL_GENERAL}TypeAudit`;
    private apiauth = 'https://localhost:44305/api/Auth/GetAllAuditeur';


    constructor(private http: HttpClient) { }
    auditList() {
        //return this.audits;
        // return this.http.get<AuditModel[]>(this.apiUrl+"/audits", httpOptions);}
        return this.http.get<AuditModel[]>(this.apiUrl);
    }

    getAuditList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    addAudit(newAudit: any): Observable<any> {
        const typeAuditId = newAudit.typeAuditId ? newAudit.typeAuditId : null;
        const typeAuditType = newAudit.typeAudit ? newAudit.typeAudit.type : null;
        const userId = newAudit.auditor_id ? newAudit.auditor_id : null;
        const userAudit = newAudit.users ? newAudit.users.username : null;

        const addData = {
            nomAudit: "string",
            dateAudit: newAudit.dateAudit,
            status: newAudit.status,
            description: newAudit.description,
            typeAuditId: typeAuditId,
            typeAudit: {
                id: typeAuditId,
                type: "string"
            },
            userId: userId
            
        };
        /*addCheckList(newCheckList: any): Observable<any> {
        const typeCheckListAuditId = newCheckList.typechecklist_id ? newCheckList.typechecklist_id : null;
        const typeCheckListAuditType = newCheckList.typeCheckListAudit ? newCheckList.typeCheckListAudit.type : null;

        // Créer un objet avec les données mises à jour, y compris typeCheckListAudit
        const addData = {
          name: newCheckList.name,
          niveau: newCheckList.niveau,
          code: newCheckList.code,
          description: newCheckList.description,
          typechecklist_id: typeCheckListAuditId,
          typeCheckListAudit: { // Ajouter les données du typeCheckListAudit
            id: typeCheckListAuditId,
            type: "string"
          }
        };*/
        return this.http.post<any>(`${this.apiUrl}`, addData, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deleteAudit(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getTypeAudits(): Observable<any[]> {
        return this.http.get<any[]>(this.typeAuditUrl).pipe(
            catchError(this.handleError)
        );
    }

    searchAuditsByType(typeAuditId: number): Observable<any[]> {
        const params = new HttpParams().set('typeAuditId', typeAuditId.toString());
        return this.http.get<any[]>(`${this.apiUrl}/search`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError(error);
    }
    updateAudit(id: number, updatedAudit: any): Observable<any> {
        // Extraire l'ID et le type du typeCheckListAudit du formulaire mis à jour
        const typeAuditId = updatedAudit.typeAuditId ? updatedAudit.typeAuditId : null;
        const typeAuditType = updatedAudit.typeAudit ? updatedAudit.typeAudit.type : null;
        const user_id = updatedAudit.auditor_id ? updatedAudit.auditor_id : null;
        const userAudit = updatedAudit.users ? updatedAudit.users.username : null;
        // Créer un objet avec les données mises à jour, y compris typeCheckListAudit
        const updatedData = {
            nomAudit: "string",
            dateAudit: updatedAudit.dateAudit,
            status: updatedAudit.status,
            description: updatedAudit.description,
            typeAuditId: typeAuditId,
            typeAudit: {
                id: typeAuditId,
                type: "string"
            },
            userId: user_id,
            user: {
                id: user_id,
                username: "string"
            }
        };
        // Envoyer la requête PUT avec les données mises à jour
        return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    /*updateCheckList(id: number, updatedCheckList: any): Observable<any> {
      // Extraire l'ID et le type du typeCheckListAudit du formulaire mis à jour
      const typeCheckListAuditId = updatedCheckList.typechecklist_id ? updatedCheckList.typechecklist_id : null;
      const typeCheckListAuditType = updatedCheckList.typeCheckListAudit ? updatedCheckList.typeCheckListAudit.type : null;

      // Créer un objet avec les données mises à jour, y compris typeCheckListAudit
      const updatedData = {
        id: updatedCheckList.id,
        name: updatedCheckList.name,
        niveau: updatedCheckList.niveau,
        code: updatedCheckList.code,
        description: updatedCheckList.description,
        typechecklist_id: typeCheckListAuditId,
        typeCheckListAudit: { // Ajouter les données du typeCheckListAudit
          id: typeCheckListAuditId,
          type: "string"
        }
      };*/
    private get httpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }



    GetAllAuditeur() {
        return this.http.get<any>(this.apiauth);

    }
    editAudit(id: number) {
        //this.audit=this.audits.find(p=> p.id==id)!;
        //return this.audit;
        return this.http.get<AuditModel>(`${this.apiUrl}/${id}`);

    }



    getAuditsByDate(date: string) {
        const parsedDate = new Date(date);
        const formattedDate = parsedDate.toISOString();
        return this.http.get<AuditModel[]>(`${this.apiUrl}/byDate?date=${formattedDate}`);


    }
}
