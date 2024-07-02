import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class NumHomologationsService {
    constructor(private apiService: ApiService) {}

    GetNumHomologation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.numHomologation.afficherAllNumHomologation,
            data
        );
    }

    AfficherNumHomologation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.numHomologation.searchNumHomologation,
            data
        );
    }

    AjouterNumHomologation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.numHomologation.AjouterNumHomologation,
            data
        );
    }

    ModifierNumHomologation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.numHomologation.ModifierNumHomologation,
            data
        );
    }

    SupprimerNumHomologation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.numHomologation.SupprimerNumHomologation,
            data
        );
    }

    GetNumHomologationByIdTypeMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.numHomologation.afficherAllNumHomologation,
            data
        );
    }
}
