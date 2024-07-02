import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class verificationPremiereService {
    constructor(private apiService: ApiService) { }

    AfficherVerificationPremiere(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.verificationPremier.search,
            data
        );
    }

    AjouterVerificationPremiere(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.verificationPremier.Ajouter,
            data
        );
    }

    LoadVerificationPremiere(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.verificationPremier.Load,
            data
        );
    }

    ModifierVerificationPremiere(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.verificationPremier.Modifier,
            data
        );
    }

    SupprimerVerificationPremiere(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.verificationPremier.Supprimer,
            data
        );
    }

    MapingDocumentsVp(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.verificationPremier.MapingDocumentsVp,
            data
        );
    }
}
