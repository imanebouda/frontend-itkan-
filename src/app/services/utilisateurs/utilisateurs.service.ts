import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Injectable({
    providedIn: 'root',
})
export class UtilisateursService {
    constructor(private apiService: ApiService) {}
    LoginUtilisateur(data: any) {
        return this.apiService.postSansHeader(
            environment.API_BASE_URL_GENERAL + environment.api.user.login,
            data
        );
    }
    /* ---------------------------------- crud ---------------------------------- */
    AjouterUtilisateur(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.user.save,
            data
        );
    }
    AfficherUtilisateur(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.user.afficher,
            data
        );
    }
    SupprimerUtilisateur(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.user.supprimer,
            data
        );
    }

    GetAllByRoleController() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + environment.api.user.GetAllByRoleController,
        );
    }
    ModifierUtilisateur(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.user.modifie,
            data
        );
    }
    ModifierPasswordUtilisateur(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.user.modifier_password,
            data
        );
    }
    AfficherImageUtilisateur(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.user.afficher_image,
            data
        );
    }
    PasswordForgotten(data: any){
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.user.PasswordForgotten,
            data
        );
    }
}
