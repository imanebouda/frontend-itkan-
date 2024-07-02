import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})

export class LigneService {
    constructor(private apiService: ApiService) {}
    
    GetEnabledLignes(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ligne.GetAll,
            data
        );
    }

    AddLigne(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ligne.Add,
            data
        );
    }

    UpdateLigne(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ligne.Update,
            data
        );
    }

    DeleteLigne(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.ligne.Delete,
            data
        );
    }
}
