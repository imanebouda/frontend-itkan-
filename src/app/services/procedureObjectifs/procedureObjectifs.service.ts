import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedureObjectifsService {
constructor(private apiService: ApiService, private http: HttpClient) { }

GetProcedureObjectifs(
    id : number,
    titre: string,
    dateDebut: Date | null,
    dateFin: Date |null ,
    field: string,
    order: string,
    take: number,
    skip: number
  ){
    // Construisez l'URL de base
    let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.ProcObjectifs.recherche}`;
    // Ajoutez les paramètres non nuls à l'URL
    const params: string[] = [];
    if (titre) {
        params.push(`titre=${titre}`);
      }
  if (id) {
    params.push(`id=${id}`);
  }
  if (dateDebut) {
    params.push(`dateDebut=${dateDebut.toISOString()}`);
  }
  if (dateFin) {
    params.push(`dateFin=${dateFin.toISOString()}`);
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

  InsertProcObjectifs(data: any){
    console.log("Service data" , data)
    return this.apiService.post(
        environment.API_BASE_URL_GENERAL + environment.api.ProcObjectifs.ajouter,
        data
    );
  }

  UpdateProcObjectifs(data: any) {
    return this.apiService.put(
        environment.API_BASE_URL_GENERAL + environment.api.ProcObjectifs.modifie,
        data
    );
  }

  DeleteAnProcedureObj(data :any ){
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.ProcObjectifs.supprimer,
      data
      );
  }
}

