import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ReclamantModel } from 'src/app/models/reclamant.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamantsService {
  private apiUrl = 'https://localhost:44305/api/reclamants';

  constructor(private http: HttpClient) {}

  addReclamant(reclamant: ReclamantModel): Observable<ReclamantModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ReclamantModel>(this.apiUrl, reclamant, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  updateReclamant(reclamant: ReclamantModel): Observable<ReclamantModel> {
    return this.http.put<ReclamantModel>(`${this.apiUrl}/${reclamant.id}`, reclamant);
  }

  getReclamantById(id: number): Observable<ReclamantModel> {
    return this.http.get<ReclamantModel>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
}