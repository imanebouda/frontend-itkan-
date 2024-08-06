import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/app/models/users.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UtilisateursService {
    private apiUrl = 'https://localhost:44305/api';
    [x: string]: any;
    
    constructor(private apiService: ApiService, private http: HttpClient) {}
    /*getUsers(): Observable<any[]> {
        return this.apiService.get<any[]>(
          environment.API_BASE_URL_GENERAL + '/Users' // Ajustez cette URL selon votre API
        );
      }*/

       /* getAllUsers(): Observable<UsersModel[]> {
            return this.http.get<UsersModel[]>(`${this.apiUrl}/GetAll`);
          }*/
     getUsersByRole(roleId: number): Observable<UsersModel[]> {
         return this.http.get<UsersModel[]>(`${this.apiUrl}/Users/GetConcernedUsers/${roleId}`);
              }
     getAllUsers(): Observable<UsersModel[]> {
         return this.http.get<UsersModel[]>(`${this.apiUrl}/Users/GetAll`);
     }                  
     getUserByRole(roleIds: number[]): Observable<UsersModel[]> {
        return this.http.get<UsersModel[]>(`${this.apiUrl}?roleIds=${roleIds.join(',')}`);
      }
      deleteUser(userId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Users/${userId}`);
    }
    
      
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
