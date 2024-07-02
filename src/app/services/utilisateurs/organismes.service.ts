import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { GeneralService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class OrganismesService {
    XKestrel: string = ''; // l'access token

    constructor(
        private http: HttpClient,
        private storeService: GeneralService,
        private messageService: MessageService,
        private apiService: ApiService
    ) {}
    /* ----------------------- Pour créer les headers autorisation ---------------------- */
    createAuthorizationHeader() {
        this.XKestrel =
            'Bearer ' + this.storeService.get_DataSession('XKestrel');
        let headers = new HttpHeaders();
        if (this.XKestrel) {
            headers = headers.append('Authorization', this.XKestrel);
            headers = headers.append('Content-Type', 'application/json');
        }
        return headers;
    }

    CurrentOrganisme() {
        return this.apiService.get(
            environment.API_BASE_URL_GENERAL + 'Organisme/CurrentOrganisme'
        );
    }

    delete(id: number) {
        return this.http
            .delete(environment.API_BASE_URL_GENERAL + 'Organisme/' + id, {
                headers: this.createAuthorizationHeader(),
            })
            .toPromise()
            .catch((res) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'erreur est survenue',
                    life: 3000,
                });
                throw Error;
            });
    }

    saveImage(file: File) {
        let formParams = new FormData();
        formParams.append('file', file);
        let headers = new HttpHeaders();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers = headers.append('enctype', 'multipart/form-data');
        headers = headers.append(
            'Authorization',
            'Bearer ' + this.storeService.get_DataSession('XKestrel')
        );

        return this.http
            .post(
                environment.API_BASE_URL_GENERAL + 'Organisme/saveImage',
                formParams,
                {
                    headers: headers,
                    responseType: 'text',
                }
            )
            .toPromise();
    }

    GetImage() {
        return this.http.get(
            environment.API_BASE_URL_GENERAL + 'Organisme/GetImage',
            {
                headers: this.createAuthorizationHeader(),
                observe: 'events',
                responseType: 'blob',
            }
        );
    }

    SaveOrganimse(data: any) {
        return this.apiService.post(
            environment.API_BASE_URL_GENERAL + 'Organisme/Save',
            data
        );
    }
}
