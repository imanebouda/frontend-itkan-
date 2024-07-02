import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class TypeAccordsService {
    constructor(private apiService: ApiService) {}

    GetTypeAccord(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeAccord.afficherAllTypeAccord,
            data
        );
    }

    AfficherTypeAccord(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeAccord.searchTypeAccord,
            data
        );
    }

    AjouterTypeAccord(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.typeAccord.AjouterTypeAccord,
            data
        );
    }

    ModifierTypeAccord(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.typeAccord.ModifierTypeAccord,
            data
        );
    }

    SupprimerTypeAccord(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.typeAccord.SupprimerTypeAccord,
            data
        );
    }
}
