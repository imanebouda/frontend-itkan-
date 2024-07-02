import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})

export class OrganismService {
    constructor(private apiService: ApiService) {}
    
    GetOrganism(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.OrganismService.Search,
            data
        );
    }

    AddAnOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.OrganismService.Add,
            data
        );
    }

    UpdateAnOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.OrganismService.Update,
            data
        );
    }

    DeleteAnOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.OrganismService.Delete,
            data
        );
    }
}
