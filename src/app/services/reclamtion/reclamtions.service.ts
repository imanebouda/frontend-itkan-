import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from '../services';
@Injectable({
    providedIn: 'root',
})
export class ReclamationsService {
    constructor(private apiService: ApiService, private http: HttpClient,
        private GeneralService: GeneralService,) {}

    AfficherReclamation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.reclamation.search,
            data
        );
    }
    GettAllReclamation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.reclamation.afficherAll,
            data
        );
    }

    getReclamationById(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.reclamation.ReclamationById,
            data
        );
    }

    AjouterReclamation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.reclamation.ajouterReclamation,
            data
        );
    }

    AddReclamation(methode: String, data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + methode,
            data
        );
    }

    ModifieReclamation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.reclamation.ModifieReclamation,
            data
        );
    }

    SupprimerReclamation(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
                environment.api.reclamation.supprimerReclamtion,
            data
        );
    }
    
    onUpload(files: any,id:Number) {
        let formData = new FormData();
        
        for (var i = 0; i < files.length; i++) {

            var item = files[i];
            formData.append('items[' + i + '].id_inspection', id.toString());
            formData.append('items[' + i + '].FileData', item);
        }

        let headers = new HttpHeaders();
        headers = headers.append('enctype', 'multipart/form-data');
        headers = headers.append(
            'Authorization',
            'Bearer ' + this.GeneralService.get_DataSession('jwt_token')
        );

        return this.http
            .post(
                environment.API_BASE_URL_GENERAL + 'reclamations/saveImage',
                formData,
                {
                    headers: headers,
                    responseType: 'text',
                }
            )
            .toPromise();
    }
}
