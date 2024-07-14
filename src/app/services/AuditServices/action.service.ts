import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Action } from 'src/app/models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private baseUrl = 'https://localhost:44305/api/Action';

  constructor(private http: HttpClient) { }

  getActions(): Observable<Action[]> {
    return this.http.get<Action[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching actions:', error);
          return throwError(error);
        })
      );
  }

  getActionById(id: number): Observable<Action> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Action>(url)
      .pipe(
        catchError(error => {
          console.error(`Error fetching action with id=${id}:`, error);
          return throwError(error);
        })
      );
  }

  createAction(action: Action): Observable<Action> {
    return this.http.post<Action>(this.baseUrl, action)
      .pipe(
        catchError(error => {
          console.error('Error creating action:', error);
          return throwError(error);
        })
      );
  }

  updateAction(id: number, action: Action): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<void>(url, action)
      .pipe(
        catchError(error => {
          console.error(`Error updating action with id=${id}:`, error);
          return throwError(error);
        })
      );
  }

  deleteAction(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(error => {
          console.error(`Error deleting action with id=${id}:`, error);
          return throwError(error);
        })
      );
  }
}
