import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class TaillesService {
    constructor(private apiService: ApiService) {}

    GetTaille(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.taille.afficherAllTaille,
            data
        );
    }

    AfficherTaille(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.taille.searchTaille,
            data
        );
    }

    AjouterTaille(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.taille.AjouterTaille,
            data
        );
    }

    ModifierTaille(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.taille.ModifierTaille,
            data
        );
    }

    SupprimerTaille(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.taille.SupprimerTaille,
            data
        );
    }
}
