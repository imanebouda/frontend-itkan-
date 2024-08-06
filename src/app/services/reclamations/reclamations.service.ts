import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ReclamationsModel } from 'src/app/models/reclamation.model';
import { UsersModel } from 'src/app/models/users.model';
import { environment } from 'src/environments/environment';
import { ReclamationDetailsModel } from 'src/app/models/reclamation-details.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'https://localhost:44305/api/reclamations';

  constructor(private http: HttpClient) {}

  getReclamations(): Observable<ReclamationsModel[]> {
    return this.http.get<ReclamationsModel[]>(this.apiUrl);
  }

  searchReclamations(status: string, date: string | null): Observable<ReclamationsModel[]> {
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    if (date) {
      params = params.append('date', date);
    }
  
    return this.http.get<ReclamationsModel[]>(`${this.apiUrl}/search`, { params });
  }
  

  updateReclamation(id: number, reclamation: ReclamationsModel): Observable<any> {
    return this.http.put(`https://localhost:44305/api/reclamations/${id}`, reclamation);
}
  
  
  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 /*addReclamation(reclamation: any): Observable<any> {
    return this.http.post('https://localhost:44305/api/reclamations', reclamation);
  }*/

  updateReclamation1(reclamation: ReclamationsModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reclamation.id}`, reclamation);
  }
  getConcernedUsers(reclamationId: number): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(`https://localhost:44305/api/comiteereclamations/${reclamationId}/concernedUsers`);
  }
  removeUserFromComitee(reclamationId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:44305/api/comiteereclamations/${reclamationId}/removeUser/${userId}`);
  }
  defineComite(reclamationId: number, userIds: number[]): Observable<void> {
    const comiteeData = { userIds: userIds };
    const url = `https://localhost:44305/api/comiteereclamations/${reclamationId}/defineComite`;
    console.log('Request URL:', url);
    console.log('Request Body:', comiteeData);
    return this.http.post<void>(url, comiteeData).pipe(
      catchError(this.handleError)
    );
  }
  
  

  getReclamationsWithReclamant(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getReclamationsWithReclamant`);
  }
  addReclamation(reclamation: ReclamationsModel): Observable<ReclamationsModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ReclamationsModel>(this.apiUrl, reclamation, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getReclamationById(id: number): Observable<ReclamationsModel> {
    return this.http.get<ReclamationsModel>(`${this.apiUrl}/${id}`);
  }
  getReclamationDetails(id: number): Observable<ReclamationDetailsModel> {
    return this.http.get<ReclamationDetailsModel>(`${this.apiUrl}/details/${id}`);
  }
   
}

