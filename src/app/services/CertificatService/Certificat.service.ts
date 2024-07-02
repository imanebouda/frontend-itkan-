import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})

export class CertificatService {
    constructor(private apiService: ApiService) {}
    
    GetCertificats(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.CertificatService.Search,
            data
        );
    }

    GetCertificatByIdInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.CertificatService.GetCertifByIdInspection,
            data
        );
    }

    AddCertificat(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.CertificatService.Add,
            data
        );
    }

    UpdateCertificat(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.CertificatService.Update,
            data
        );
    }

    DeleteCertificat(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.CertificatService.Delete,
            data
        );
    }
}
