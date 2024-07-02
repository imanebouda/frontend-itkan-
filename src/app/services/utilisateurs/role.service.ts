import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private apiService: ApiService) {}
    AfficherRole(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.role.search,
            data
        );
    }

    AjouterRole(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.role.AjouterRole,
            data
        );
    }

    ModifieRole(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.role.ModifieRole,
            data
        );
    }

    SupprimerRole(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.role.supprimer,
            data
        );
    }
}
