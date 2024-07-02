import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})

export class materielUtiliseService {
    constructor(private apiService: ApiService) {}
    
    GetMaterielUtiliseByIdInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.materielUtilise.GetAll,
            data
        );
    }

    SaveMaterielUtiliseForInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.materielUtilise.Save,
            data
        );
    }

    // UpdateTypeCapteurVitesse(data: any) {
    //     return this.apiService.post(
    //         environment.API_BASE_URL_GENERAL + environment.api.materielUtilise.Update,
    //         data
    //     );
    // }

    // DeleteTypeCapteurVitesse(data: any) {
    //     return this.apiService.post(
    //         environment.API_BASE_URL_GENERAL + environment.api.materielUtilise.Delete,
    //         data
    //     );
    // }
}
