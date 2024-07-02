import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class TypeInspectionsService {
    constructor(private apiService: ApiService) {}
    AfficherTypeInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeInspection.searchTypeInspection,
            data
        );
    }

    AjouterTypeInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.typeInspection.AjouterTypeInspection,
            data
        );
    }

    ModifierTypeInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.typeInspection.ModifierTypeInspection,
            data
        );
    }

    SupprimerTypeInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.typeInspection.SupprimerTypeInspection,
            data
        );
    }
}
