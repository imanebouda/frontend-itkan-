import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class FabriquantsService {
    constructor(private apiService: ApiService) {}

    GetFabriquants(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.fabriquant.afficherAllFabriquant,
            data
        );
    }

    AfficherFabriquant(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.fabriquant.search,
            data
        );
    }

    AjouterFabriquant(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.fabriquant.AjouterFabriquant,
            data
        );
    }

    ModifieFabriquant(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.fabriquant.ModifieFabriquant,
            data
        );
    }

    SupprimerFabriquant(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.fabriquant.SupprimerFabriquant,
            data
        );
    }
}
