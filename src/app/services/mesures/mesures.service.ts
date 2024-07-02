import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class MesureService {
    constructor(private apiService: ApiService) {}
    AddMesures(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.mesure.Ajouter,
            data
        );
    }
    GetInputMesureByEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.mesure.afficherAll,
            data
        );
    }
    ModifieEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.mesure.Modifie,
            data
        );
    }

    SaveMesure(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.mesure.Save,
            data
        );
    }

    MesuresAnnexes(data:any){
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.mesure.Load,
            data
        );
    }
}