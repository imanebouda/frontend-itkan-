import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from '../services';
@Injectable({
    providedIn: 'root',
})
export class InspectionService {

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private GeneralService: GeneralService,
    ) { }

    getHeaderNamesFromCSV(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<string[]>(environment.API_BASE_URL_GENERAL + environment.api.inspection.getHeaderNamesFromCSV, formData);
    }

    AfficherInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.search,
            data
        );
    }

    GetAllInspections(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.afficherAll,
            data
        );
    }

    getInspectionById(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.InspectionById,
            data,
        );
       
    }

    AjouterInspection(methode: String, data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + methode,
            data
        );
    }

    InsertStepper(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.InsertStepper,
            data
        );
    }

    ModifieInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.Modifie,
            data
        );
    }

    SupprimerInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.supprimer,
            data
        );
    }

    DemarrerInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.DemarrerInspection,
            data
        );
    }

    DecisionRtc(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.DecisionRtc,
            data
        );
    }

    ArreterInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.ArreterInspection,
            data
        );
    }

    ClosingeInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + environment.api.inspection.ClosingeInspection,
            data
        );
    }

    AffecterInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.inspection.AffecterInspection,
            data
        );
    }

    ValidationInspection(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.inspection.ValidationInspection,
            data
        );
    }

    RemoveImages(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL +
            environment.api.inspection.RemoveImages,
            data
        );
    }

    onUpload(data: any) {
        let formData = new FormData();

        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            formData.append('items[' + i + '].id_inspection', item.id_inspection);
            formData.append('items[' + i + '].name', item.name);
            formData.append('items[' + i + '].type', item.type);
            formData.append('items[' + i + '].FileData', item.file);
        }

        let headers = new HttpHeaders();
        headers = headers.append('enctype', 'multipart/form-data');
        headers = headers.append(
            'Authorization',
            'Bearer ' + this.GeneralService.get_DataSession('jwt_token')
        );

        return this.http
            .post(
                environment.API_BASE_URL_GENERAL + 'inspections/saveImage',
                formData,
                {
                    headers: headers,
                    responseType: 'text',
                }
            )
            .toPromise();
    }
}
