import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class ApiGeneralService {
    constructor(private apiService: ApiService) {}
    TelechargerDocument(data: any) {
        return this.apiService.postDownload(
            environment.API_BASE_URL_GENERAL +
                environment.api.general.telecharger,
            data
        );
    }
    LoadRolesList(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.role.afficherAll,
            data
        );
    }
    AfficherLogs(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.general.AfficherLogs,
            data
        );
    }
    /* -------------------------------- Dashboard ------------------------------- */
    LoadCountDashboard(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.general.LoadCountDashboard,
            data
        );
    }
} // fin Class
