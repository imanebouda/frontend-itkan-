import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManuelQualiteService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  DetailAnMQdDocuments() {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ManuelQualite.detaille}`;
    return this.apiService.get(url);
  }

  InsertMQdocuments(data: any) {
    return this.http.post(
      environment.API_BASE_URL_GENERAL + environment.api.ManuelQualite.ajouter,
      data
    );
  }

  UpdateMQDocuments(data: any) {
    return this.http.post(
      environment.API_BASE_URL_GENERAL + environment.api.ManuelQualite.modifie,
      data
    );
  }
  getPdf(pdfId: number) {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcDocuments.download}?pdfId=${pdfId}`;
    return this.http.get(url, {
      responseType: 'arraybuffer'
    });
  }

  DeleteAnMQDocuments(data: any) {
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.ManuelQualite.supprimer,
      data
    );
  }

  StatutAnMQDocuments(data: any) {
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.ManuelQualite.statut,
      data
    );
  }

  DownloadMQDocument(ID: number) {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ManuelQualite.download}?MQDocumentID=${ID}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }


}