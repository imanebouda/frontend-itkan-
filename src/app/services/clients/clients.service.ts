import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    constructor(private apiService: ApiService, private http: HttpClient) { }
    AfficherClients(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.clients.search,
            data
        );
    }

    GetClients(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.clients.afficherAll,
            data
        );
    }

    GetClientsByName(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.clients.searchByName,
            data
        );
    }


    getHeaderNamesFromCSV(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<string[]>(environment.API_BASE_URL_GENERAL + environment.api.clients.getHeaderNamesFromCSV, formData);
    }

    AjouterClients(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.clients.Ajouter,
            data
        );
    }

    ModifieClients(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.clients.Modifie,
            data
        );
    }

    SupprimerClients(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.clients.supprimer,
            data
        );
    }
}
