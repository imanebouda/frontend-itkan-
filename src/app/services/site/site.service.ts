import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class SiteService {
    constructor(private apiService: ApiService) { }
    AfficherParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.sites.search,
            data
        );
    }

    AllParametrage() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.sites.afficherAll,
        );
    }

    AjouterParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.sites.Ajouter,
            data
        );
    }

    ModifieParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.sites.Modifie,
            data
        );
    }

    SupprimerParametrage(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.sites.supprimer,
            data
        );
    }
}
