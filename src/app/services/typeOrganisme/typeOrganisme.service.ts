import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})

export class typeOrganismeService {
    constructor(private apiService: ApiService) {}
    
    GetTypeOrganisme(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrganisme.GetAll,
            data
        );
    }

    AddTypeOrganisme(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrganisme.Add,
            data
        );
    }

    UpdateTypeOrganisme(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrganisme.Update,
            data
        );
    }

    DeleteTypeOrganisme(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrganisme.Delete,
            data
        );
    }
}
