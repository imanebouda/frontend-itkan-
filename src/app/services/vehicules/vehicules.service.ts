import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class VehiculesService {
    constructor(private apiService: ApiService, private http: HttpClient) { }
    AfficherVehicules(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.search,
            data
        );
    }
    GetAllVehicules(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.afficherAll,
            data
        );
    }
    GetVehiculesByImmatri(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.searchByImmatri,
            data
        );
    }

    AjouterVehicules(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.Ajouter,
            data
        );
    }

    ModifieVehicules(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.Modifie,
            data
        );
    }

    SupprimerVehicules(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.supprimer,
            data
        );
    }

    GetAutoCompletChamps() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.AutoCompletChamps,
        );
    }

    getHeaderNamesFromCSV(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<string[]>(environment.API_BASE_URL_GENERAL + environment.api.vehicules.getHeaderNamesFromCSV, formData);
    }

}
