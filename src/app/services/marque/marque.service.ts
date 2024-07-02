import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class MarquesService {
    constructor(private apiService: ApiService) {}

    GetMarques(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.marque.afficherAllMarque,
            data
        );
    }

    AfficherMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.marque.searchMarque,
            data
        );
    }

    AjouterMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.marque.AjouterMarque,
            data
        );
    }

    ModifieMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.marque.ModifierMarque,
            data
        );
    }

    SupprimerMarque(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.marque.SupprimerMarque,
            data
        );
    }

    GetAutoCompletChamps(){
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.vehicules.AutoCompletChamps,
        );
    }
}
