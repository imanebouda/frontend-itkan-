import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/services/general/general.service';

/* -------------------------------------------------------------------------- */
/*              EndPoint pour les différentes requêtes vers l'api             */
/* -------------------------------------------------------------------------- */

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    jwt_token: string = ''; // l'access token

    constructor(
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService,
        private GeneralService: GeneralService
    ) {}

    /* ----------------------- Pour créer les headers autorisation ---------------------- */
    createAuthorizationHeader() {
        this.jwt_token =
            'Bearer ' + this.GeneralService.get_DataSession('jwt_token');
        let headers = new HttpHeaders();
        if (this.jwt_token) {
            headers = headers.append('Authorization', this.jwt_token);
            headers = headers.append('Content-Type', 'application/json');
        }
        return headers;
    }

    createAuthorizationHeaderUpload() {
        this.jwt_token =
            'Bearer ' + this.GeneralService.get_DataSession('jwt_token');
        let headers = new HttpHeaders().set("Content-Type","multipart/form-data");
        if (this.jwt_token) {
            headers = headers.append('Authorization', this.jwt_token);
        }
        return headers;
    }

    errormessage(code: any) {
        // gestion des erreurs http
        switch (code) {
            case 403: {
                localStorage.clear();
                this.messageService.add({
                    severity: 'warn',
                    detail: 'Accès interdit ...',
                });
                setTimeout(() => {
                    this.router.navigate(['/auth']);
                }, 2100);
                break;
            }
            case 404: {
                this.messageService.add({
                    severity: 'warn',
                    detail: 'Méthode introuvable ...',
                });
                break;
            }
            case 402: {
                this.messageService.add({
                    severity: 'warn',
                    detail: 'Fichier introuvable ...',
                });
                break;
            }
            case 500:
            case 401: {
                localStorage.clear();
                this.messageService.add({
                    severity: 'warn',
                    detail: 'Session expirée ...',
                });
                setTimeout(() => {
                    this.router.navigate(['/auth']);
                }, 1500);
                break;
            }
            case 405: {
                this.messageService.add({
                    severity: 'warn',
                    detail: 'Oups quelque chose a mal tourné ...',
                });
                break;
            }
            case 0: {
                this.messageService.add({
                    severity: 'warn',
                    detail: 'Serveur inaccessible ...',
                });
                break;
            }
            default: {
                this.messageService.add({
                    severity: 'warn',
                    detail: 'Oups quelque chose a mal tourné ...',
                });
                break;
            }
        } // fin switch erreur
    }

    /* ---------------- Endpoint pour les requetes de types post ---------------- */

    post(endpoint: string, body: any) {
        return this.http
            .post(endpoint, body, {
                headers: this.createAuthorizationHeader(),
            })
            .pipe(
                catchError((erreur: HttpErrorResponse) => {
                    this.errormessage(erreur?.status);
                    return of({ results: erreur });
                })
            );
    }

    postSansHeader(endpoint: string, body: any) {
        return this.http.post(endpoint, body).pipe(
            catchError((erreur: HttpErrorResponse) => {
                this.errormessage(erreur?.status);
                return of({ results: erreur });
            })
        );
    }

    postDownload(endpoint: string, body: any) {
        return this.http
            .post(endpoint, body, {
                headers: this.createAuthorizationHeader(),
                responseType: 'blob',
            })
            .pipe(
                catchError((erreur: HttpErrorResponse) => {
                    this.errormessage(erreur?.status);
                    return of({ results: erreur });
                })
            );
    }

    postUpload(endpoint: string, body: any) {
        return this.http
            .post(endpoint, body, {
                headers: this.createAuthorizationHeaderUpload(),
            })
            .pipe(
                catchError((erreur: HttpErrorResponse) => {
                    this.errormessage(erreur?.status);
                    return of({ results: erreur });
                })
            );
    }

    get(endpoint: string) {
        return this.http
            .get(endpoint, {
                headers: this.createAuthorizationHeader(),
            })
            .pipe(
                catchError((erreur: HttpErrorResponse) => {
                    this.errormessage(erreur?.status);
                    return of({ results: erreur });
                })
            );
    }

    getSansHeader(endpoint: string) {
        return this.http.get(endpoint).pipe(
            catchError((erreur: HttpErrorResponse) => {
                this.errormessage(erreur?.status);
                return of({ results: erreur });
            })
        );
    }
    
    put(endpoint: string, body: any) {
        return this.http
            .put(endpoint, body, {
                headers: this.createAuthorizationHeader(),
            })
            .pipe(
                catchError((erreur: HttpErrorResponse) => {
                    this.errormessage(erreur?.status);
                    return of({ results: erreur });
                })
            );
    }
    
}
