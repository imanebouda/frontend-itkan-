import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

 

  GetProcedures(
    id : number,
    code : string,
    libelle: string,
    dateDebut: Date | null,
    dateFin: Date |null ,
    field: string,
    order: string,
    take: number,
    skip: number
  ){
        // Construisez l'URL de base
        let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.Procedures.recherche}`;
        // Ajoutez les paramètres non nuls à l'URL
        const params: string[] = [];
        if (id) {
            params.push(`id=${id}`);
        }
        if (libelle) {
            params.push(`libelle=${libelle}`);
        }
        if (code) {
            params.push(`code=${code}`);
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


    InsertProcedure(data: any) {
        console.log("Service data" , data)
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.Procedures.ajouter,
            data
        );
    }

    UpdateProcedure(data: any) {
        console.log('data',data)
        return this.apiService.put(
            environment.API_BASE_URL_GENERAL + environment.api.Procedures.modifie,
            data
        );
    }

    DeleteAnProcedure(data: any){
    return this.apiService.post(
      environment.API_BASE_URL_GENERAL + environment.api.Procedures.supprimer,
      data
    );
    }

    getDetailProcedure(ID: number){
        const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Procedures.detaille}/?ID=${ID}`;
        return this.apiService.get(url);
        }
    

    getAllProcedureByIdProces(ID: number){
        const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Procedures.getAll}?ProcessusID=${ID}`;
        return this.apiService.get(url);
        }
        

}