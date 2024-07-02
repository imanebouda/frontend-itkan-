import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class OrdreService {
    constructor(private apiService: ApiService, private http: HttpClient) { }

    GetOrdersService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.search,
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

    GetAllOrdersService() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.afficherAll,
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

    AddAnOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.Ajouter,
            data
        );
    }

    UpdateAnOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.Modifie,
            data
        );
    }

    DeleteAnOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ordreService.supprimer,
            data
        );
    }
}
