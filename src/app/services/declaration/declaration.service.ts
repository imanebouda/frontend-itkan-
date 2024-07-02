import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class DeclarationService {
    put(arg0: string, value: any) {
        throw new Error('Method not implemented.');
    }
    constructor(private apiService: ApiService, private http: HttpClient) { }

    GetDeclaration(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.declaration.search,
            data
        );
    }


    MapingDocuments(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.MapingDocuments,
            data
        );
    }

    GetHistoriques(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.GetHistoriques,
            data
        );
    }

    Load(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.load,
            data
        );
    }

    getHeaderNamesFromCSV(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<string[]>(environment.API_BASE_URL_GENERAL + environment.api.ordreService.getHeaderNamesFromCSV, formData);
    }

    GetAllDeclaration() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.declaration.afficherAll,
        );
    }

    GetTypeInspections() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.GetAllTypeInspections,
        );
    }

    GetAllTypeDAccord() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.GetAllTypeDAccord,
        );
    }


    SendEmailOds(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.SendEmailOds,
            data
        );
    }

    Reouvrirods(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.Reouvrirods,
            data
        );
    }

    AddAnDeclaration(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.declaration.Ajouter,
            data
        );
    }

    UpdateAnDeclaration(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.declaration.Modifie,
            data
        );
    }

    DeleteAnDeclaration(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.declaration.supprimer,
            data
        );
    }

    changerStatutDeclaration(declarationId: number, nouveauStatut: number) {
        const request = {
          declarationId: declarationId,
          nouveauStatut: nouveauStatut
        };
        const url = `${environment.API_BASE_URL_GENERAL + environment.api.declaration.changerStatut}?declarationId=${declarationId}&nouveauStatut=${nouveauStatut}`;
     
        return this.apiService.post(url, request);
      }
}
