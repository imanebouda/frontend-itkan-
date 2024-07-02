import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class AnnexeService {
    constructor(private apiService: ApiService) {}
    AddAnnexe(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.annexe.Ajouter,
            data
        );
    }
    GetAnnexByType(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.annexe.afficherAll,
            data
        );
    }
    ModifieEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.annexe.Modifie,
            data
        );
    }
}