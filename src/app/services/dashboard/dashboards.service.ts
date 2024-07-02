import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class DashboardsService {
    constructor(private apiService: ApiService) {}

    Tableaux(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.dashboards.tableaux,
            data
        );
    }

    TableauxResultIndicateur(Annee : number){
        const url = `${environment.API_BASE_URL_GENERAL}${environment.api.dashboards.tableauxResultIndicateurs}?Annee=${Annee}`;
        return this.apiService.get(url);
    }
}
