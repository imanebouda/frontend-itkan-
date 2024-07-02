import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
@Injectable({
    providedIn: 'root',
})
export class PermissionService {
    constructor(private apiService: ApiService) {}

    AfficherPermission(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.permissions.getAllbyRole,
            data
        );
    }

    AjouterPermissions(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.permissions.save,
            data
        );
    }
}
