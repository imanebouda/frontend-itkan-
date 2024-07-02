import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class ParametrageService {
    constructor(private apiService: ApiService) { }
    AfficherParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.parametrage.search,
            data
        );
    }

    AllParametrage() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.parametrage.afficherAll,
        );
    }

    AjouterParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.parametrage.Ajouter,
            data
        );
    }

    ModifieParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.parametrage.Modifie,
            data
        );
    }

    SupprimerParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.parametrage.supprimer,
            data
        );
    }
}
