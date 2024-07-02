import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResultatIndicateurService {
    constructor(private apiService: ApiService, private http: HttpClient) { }

    GetIndicateursResultat(
        id: number,
        periode: string,
        annee : number ,
        field: string,
        order: string,
        take: number,
        skip: number
        ) {
        // Construisez l'URL de base
        let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.ResultatIndicateurs.recherche}`;
        const params: string[] = [];
        if (id) {
            params.push(`id=${id}`);
        }
        if (periode) {
            params.push(`periode=${periode}`);
        }
        if (annee) {
            params.push(`annee=${annee}`);
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
        return this.apiService.get(endpoint);
    }

    InsertIndicateursResultat(data: any) {
        console.log("Service data", data)
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ResultatIndicateurs.ajouter,
            data
        );
    }

    UpdateIndicateursResultat(data: any) {
        return this.apiService.put(
            environment.API_BASE_URL_GENERAL + environment.api.ResultatIndicateurs.modifie,
            data
        );
    }

    DeleteAnIndicateursResultat(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ResultatIndicateurs.supprimer,
            data
        );
    }
    
    getDetailIndicateursResultat(ID: number){
        const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Indicateurs.detaille}/?ID=${ID}`;
        return this.apiService.get(url);
        }
}

