import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class PhrasiersService {
    constructor(private apiService: ApiService) {}
    AfficherPhrasier(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.phrasier.search,
            data
        );
    }

    AjouterPhrasier(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.phrasier.AjouterPhrasier,
            data
        );
    }

    ModifiePhrasier(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.phrasier.ModifiePhrasier,
            data
        );
    }

    SupprimerPhrasier(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.phrasier.supprimer,
            data
        );
    }
}
