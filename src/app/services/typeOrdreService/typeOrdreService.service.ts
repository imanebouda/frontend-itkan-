import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})

export class TypeOrdreService {
    constructor(private apiService: ApiService) {}
    
    GetTypeOrdersService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrdreService.GetAll,
            data
        );
    }

    AddTypeOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrdreService.Add,
            data
        );
    }

    UpdateTypeOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrdreService.Update,
            data
        );
    }

    DeleteTypeOrderService(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.typeOrdreService.Delete,
            data
        );
    }
}
