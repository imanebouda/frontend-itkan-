import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})

export class TypeCaptureVitesseService {
    constructor(private apiService: ApiService) {}
    
    GetTypeCapteurVitesses(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.TypeCapteurVitesse.GetAll,
            data
        );
    }

    SearchTypeCapteurVitesses(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.TypeCapteurVitesse.Search,
            data
        );
    }

    AddTypeCapteurVitesse(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.TypeCapteurVitesse.Add,
            data
        );
    }

    UpdateTypeCapteurVitesse(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.TypeCapteurVitesse.Update,
            data
        );
    }

    DeleteTypeCapteurVitesse(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.TypeCapteurVitesse.Delete,
            data
        );
    }
}
