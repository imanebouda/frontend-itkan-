import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class SmqService {
    constructor(private apiService: ApiService) { }
    AfficherParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.smq.search,
            data
        );
    }

    AllParametrage() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.smq.afficherAll,
        );
    }

    AjouterParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.smq.Ajouter,
            data
        );
    }

    ModifieParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.smq.Modifie,
            data
        );
    }

    SupprimerParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.smq.supprimer,
            data
        );
    }
}
