import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class TypeMarquesService {
    constructor(private apiService: ApiService) { }

    GetTypeMarques(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeMarque.afficherAllTypeMarque,
            data
        );
    }

    AfficherTypeMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeMarque.searchTypeMarque,
            data
        );
    }

    AjouterTypeMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.typeMarque.AjouterTypeMarque,
            data
        );
    }

    ModifierTypeMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.typeMarque.ModifierTypeMarque,
            data
        );
    }

    SupprimerTypeMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.typeMarque.SupprimerTypeMarque,
            data
        );
    }

    GetTypeMarqueByIdMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeMarque.afficherAllTypeMarque,
            data
        );
    }
}
