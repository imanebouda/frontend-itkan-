import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class EssaiService {
    constructor(private apiService: ApiService) { }

    LoadEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.load,
            data
        );
    }

    AfficherEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.search,
            data
        );
    }

    GetEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.afficherAll,
            data
        );
    }
    AjouterEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.Ajouter,
            data
        );
    }

    ModifieEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.Modifie,
            data
        );
    }

    SupprimerEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.supprimer,
            data
        );
    }

    ValidationEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.validationEssai,
            data
        );
    }

    DemarrerVerification(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.DemarrerVerification,
            data
        );
    }

    DecisionRtc(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.DecisionRtc,
            data
        );
    }

    InsertStepper(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.essai.InsertStepper,
            data
        );
    }
}