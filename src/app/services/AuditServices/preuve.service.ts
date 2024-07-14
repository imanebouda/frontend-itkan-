import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Preuve } from 'src/app/models/preuve.model';

@Injectable({
  providedIn: 'root'
})
export class PreuveService {
  private baseUrl = 'https://localhost:44305/api/Preuve';

  constructor(private http: HttpClient) { }

  getPreuves(): Observable<Preuve[]> {
    return this.http.get<Preuve[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching preuves:', error);
          return throwError(error);
        })
      );
  }

  getPreuveById(id: number): Observable<Preuve> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Preuve>(url)
      .pipe(
        catchError(error => {
          console.error(`Error fetching preuve with id=${id}:`, error);
          return throwError(error);
        })
      );
  }

  createPreuve(preuve: Preuve): Observable<Preuve> {
    return this.http.post<Preuve>(this.baseUrl, preuve)
      .pipe(
        catchError(error => {
          console.error('Error creating preuve:', error);
          return throwError(error);
        })
      );
  }

  updatePreuve(id: number, preuve: Preuve): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<void>(url, preuve)
      .pipe(
        catchError(error => {
          console.error(`Error updating preuve with id=${id}:`, error);
          return throwError(error);
        })
      );
  }

  deletePreuve(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(error => {
          console.error(`Error deleting preuve with id=${id}:`, error);
          return throwError(error);
        })
      );
  }
}
