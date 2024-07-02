import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class EquipementsService {
    constructor(private apiService: ApiService) {}
    AfficherEquipement(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.equipement.search,
            data
        );
    }

    AjouterEquipement(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.equipement.AjouterEquipement,
            data
        );
    }

    ModifieEquipement(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.equipement.ModifieEquipement,
            data
        );
    }

    SupprimerEquipement(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.equipement.SupprimerEquipement,
            data
        );
    }
}
