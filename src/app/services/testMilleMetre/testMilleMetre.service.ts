import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class testMilleMetreService {
    constructor(private apiService: ApiService) {}
    Search(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.testMilleMetre.Search,
            data
        );
    }

    GetAll(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.testMilleMetre.GetAll,
            data
        );
    }

    Add(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.testMilleMetre.Add,
            data
        );
    }

    LoadByIdEssai(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.testMilleMetre.LoadByIdEssai,
            data
        );
    }

    Update(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.testMilleMetre.Update,
            data
        );
    }

    Delete(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.testMilleMetre.Delete,
            data
        );
    }
}
