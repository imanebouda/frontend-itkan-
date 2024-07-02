import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolitiqueQualiteService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  DetailAnPQdDocuments() {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.PolitiqueQualite.detaille}`;
    return this.apiService.get(url);
  }

  InsertPQdocuments(data: any) {
    return this.http.post(
      environment.API_BASE_URL_GENERAL + environment.api.PolitiqueQualite.ajouter,
      data
    );
  }

  UpdatePQDocuments(data: any) {
    return this.http.post(
      environment.API_BASE_URL_GENERAL + environment.api.PolitiqueQualite.modifie,
      data
    );
  }
  getPdf(pdfId: number) {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcDocuments.download}?pdfId=${pdfId}`;
    return this.http.get(url, {
      responseType: 'arraybuffer'
    });
  }

  DeleteAnPQDocuments(data: any) {
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.PolitiqueQualite.supprimer,
      data
    );
  }

  StatutAnPQDocuments(data: any) {
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.PolitiqueQualite.statut,
      data
    );
  }

  DownloadPQDocument(ID: number) {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.PolitiqueQualite.download}?PQDocumentID=${ID}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }


}