import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcDocumentsService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  DetailAnProcDocuments(ID: number){
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcDocuments.detaille}/?ID=${ID}`;
    return this.apiService.get(url);
    }
  
    DownloadProcDocument(ID: number){
      const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcDocuments.download}?ProcDocument=${ID}`;
      return this.http.get(url, {
        responseType: 'blob',
      } );
      }
  
    InsertProcedureDocuments(data: any) {
      console.log("Service data", data);
      return this.http.post(
        environment.API_BASE_URL_GENERAL + environment.api.ProcDocuments.ajouter,
        data
      );
    }
    
  UpdateProcedureDocuments(data: any) {
    return this.http.post(
        environment.API_BASE_URL_GENERAL + environment.api.ProcDocuments.modifie,
        data
    );
}

DeleteAnProcedureDocuments(data: any){
  return this.apiService.post(
    environment.API_BASE_URL_GENERAL + environment.api.ProcDocuments.supprimer,
    data
);
}

StatutAnProcedureDocuments(data : any){
  return this.apiService.post(
    environment.API_BASE_URL_GENERAL + environment.api.ProcDocuments.statut,
    data
);
}

GetAllProcDocumentNonPerime(ID : number){
  const url = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcDocuments.getAll}/?ProcID=${ID}`;
    return this.apiService.get(url);
}

GetProcDocumentsPerime(
  libelle: string,
  field: string,
  order: string,
  take: number,
  skip: number
){
  // Construisez l'URL de base
  let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcDocuments.recherche}`;
  // Ajoutez les paramètres non nuls à l'URL
  const params: string[] = [];

if (libelle) {
  params.push(`libelle=${libelle}`);
}
if (field) {
  params.push(`field=${field}`);
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