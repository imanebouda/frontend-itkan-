import { Injectable } from '@angular/core';
import { SiteAuditModel } from 'src/app/models/site-audit.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SiteAuditService {
  private apiUrl = 'https://localhost:44305/api/SiteAudit';

    constructor(private http: HttpClient) {}

    SiteAuditList() {
        return this.http.get<SiteAuditModel[]>(this.apiUrl);
    }

    addSiteAudit(newSiteAudit: SiteAuditModel) {
        return this.http.post<SiteAuditModel>(this.apiUrl, newSiteAudit, httpOptions);
    }

    deleteSiteAudit(id: number, SiteAuditData: any) {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, SiteAuditData)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error);
    }

    editSiteAudit(id: number) {
        return this.http.get<SiteAuditModel>(`${this.apiUrl}/${id}`);
    }

    updateSiteAudit(id: number, newSiteAudit: SiteAuditModel) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, newSiteAudit);
    }
}
