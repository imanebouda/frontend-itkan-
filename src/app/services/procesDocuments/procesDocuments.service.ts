import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesDocumentsService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  DetailAnProcesDocuments(ID: number) {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcesDocuments.detaille}/?ID=${ID}`;
    return this.apiService.get(url);
  }

  DownloadProcesDocument(ID: number) {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcesDocuments.download}?ProcesDocument=${ID}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }
  DocumentContainsValidDocument(data : any):Observable<boolean> {
    return this.http.post<boolean>(
      environment.API_BASE_URL_GENERAL + environment.api.ProcesDocuments.check,
      data
    );
  }

  InsertProcessusDocuments(data: any) {
    console.log("Service data", data);
    return this.http.post(
      environment.API_BASE_URL_GENERAL + environment.api.ProcesDocuments.ajouter,
      data
    );
  }

  UpdateProcessusDocuments(data: any) {
    return this.http.post(
      environment.API_BASE_URL_GENERAL + environment.api.ProcesDocuments.modifie,
      data
    );
  }

  DeleteAnProcessusDocuments(data: any) {
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.ProcesDocuments.supprimer,
      data
    );
  }

  StatutAnProcessusDocuments(data: any) {
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.ProcesDocuments.statut,
      data
    );
  }

  GetDocumentsPerime(
    procedureID: number,
    processusID : number,
    MQ : boolean,
    PQ : boolean ,
    dateDebut: Date | null,
    dateFin: Date | null,
    code : string,
    version: string,
    libelle: string,
    field: string,
    order: string,
    take: number,
    skip: number
  ) {
  
    // Construisez l'URL de base
    let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcesDocuments.recherche}`;
    // Ajoutez les paramètres non nuls à l'URL
    const params: string[] = [];
    if (procedureID) {
      params.push(`procedureID=${procedureID}`);
    }
    if (processusID) {
      params.push(`processusID=${processusID}`);
    }
    if (MQ) {
      params.push(`MQ=${MQ}`);
    }
    if (PQ) {
      params.push(`PQ=${PQ}`);
    }
    if (dateDebut) {
      params.push(`dateDebut=${dateDebut.toDateString()}`);
    }
    if (dateFin) {
      params.push(`dateFin=${dateFin.toDateString()}`);
    }
    if (libelle) {
      params.push(`libelle=${libelle}`);
    }
    if (field) {
      params.push(`field=${field}`);
    }
    if (version) {
      params.push(`version=${version}`);
    }
    if (code) {
      params.push(`code=${code}`);
    }
    if (order) {
      params.push(`order=${order}`);
    }
    if (take) {
      params.push(`take=${take}`);
    }
    if (skip) {
      params.push(`skip=${skip}`);
    }
    if (params.length > 0) {
      endpoint += '?' + params.join('&');
    }
    // Effectuez l'appel API GET
    return this.apiService.get(endpoint);
  }

 



}