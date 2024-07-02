import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessusService {

  constructor(private apiService: ApiService, private http: HttpClient) { }
  GetProcessus(
    code: string,
    libelle: string,
    categorie: string,
    field: string,
    order: string,
    take: number,
    skip: number
  ){
    // Construisez l'URL de base
    let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.recherche}`;
    // Ajoutez les paramètres non nuls à l'URL
    const params: string[] = [];

  if (code) {
    params.push(`code=${code}`);
  }
  if (libelle) {
    params.push(`libelle=${libelle}`);
  }
  if (categorie) {
    params.push(`categorie=${categorie}`);
  }
  if (field) {
    params.push(`field=${field}`);
  }
  if (order) {
    params.push(`order=${order}`);
  }
  if (take) {
    params.push(`take=${take}`);
  }
  if (skip) {
    params.push(`skip=${skip}`);
  }

  if (params.length > 0) {
    endpoint += '?' + params.join('&');
  }
    // Effectuez l'appel API GET
    return this.apiService.get(endpoint);
  }

  getProcessusByPilote(pilote :number ,coPilote :number){
    let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.getProcessusByPilote}`;
    const params: string[] = [];
    if (pilote) {
      params.push(`pilote=${pilote}`);
    }
    if (coPilote) {
      params.push(`coPilote=${coPilote}`);
    }

    if (params.length > 0) {
      endpoint += '?' + params.join('&');
    }
      // Effectuez l'appel API GET
      return this.apiService.get(endpoint);
  }

  InsertProcessus(data: any) {
    console.log("Service data" , data)
    return this.apiService.post(
        environment.API_BASE_URL_GENERAL + environment.api.Processus.ajouter,
        data
    );
  }

  getCategories(): Observable<any> {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.categories}`;
    return this.apiService.get(url);
  }

  // Méthode pour récupérer la liste des SMQ depuis l'API
  getSMQ(): Observable<any> {
    const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.smq}`;
    return this.apiService.get(url);
  }

  UpdateProcessus(data: any) {
    return this.apiService.put(
        environment.API_BASE_URL_GENERAL + environment.api.Processus.modifie,
        data
    );
}

DeleteAnProcessus(data: any){
  return this.apiService.post(
    environment.API_BASE_URL_GENERAL + environment.api.Processus.supprimer,
    data
);
}

DetailAnProcessus(data: any){
  return this.apiService.post(
    environment.API_BASE_URL_GENERAL + environment.api.Processus.detaille,
    data
);
}

getDetailProcessus(ID: number){
const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.detaille}/?ID=${ID}`;
return this.apiService.get(url);
}

getUsers(): Observable<any> {
  const url = `${environment.API_BASE_URL_GENERAL}${environment.api.user.getAll}`;
  return this.apiService.get(url);
}

getAllPilote(): Observable<any> {
  const url = `${environment.API_BASE_URL_GENERAL}${environment.api.user.getAllPilote}`;
  return this.apiService.get(url);
}

getAllCoPilote(): Observable<any> {
  const url = `${environment.API_BASE_URL_GENERAL}${environment.api.user.getAllCoPilote}`;
  return this.apiService.get(url);
}

GetAllProcessus(){
  const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.getAll}`;
return this.apiService.get(url);
}
/*
    getProcessusByAuditType(auditType: string): Observable<any> {
        let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.getProcessusByAuditType}`;

        // Construire les paramètres de requête
        const params = new HttpParams().set('auditType', auditType);

        // Effectuer l'appel API GET avec les paramètres
        return this.http.get(endpoint, { params }).pipe(
            catchError(error => {
                console.error('Une erreur s\'est produite lors de la récupération des processus par type d\'audit:', error);
                return throwError(error);
            })
        );
    }*/
    getProcessusByAuditType(
        code: string,
        libelle: string,
        categorie: string,
        field: string,
        order: string,
        take: number,
        skip: number
    ){
        // Construisez l'URL de base
        let endpoint = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.getProcessusByAuditType}`;
        // Ajoutez les paramètres non nuls à l'URL
        const params: string[] = [];

        if (code) {
            params.push(`code=${code}`);
        }
        if (libelle) {
            params.push(`libelle=${libelle}`);
        }
        if (categorie) {
            params.push(`categorie=${categorie}`);
        }
        if (field) {
            params.push(`field=${field}`);
        }
        if (order) {
            params.push(`order=${order}`);
        }
        if (take) {
            params.push(`take=${take}`);
        }
        if (skip) {
            params.push(`skip=${skip}`);
        }

        if (params.length > 0) {
            endpoint += '?' + params.join('&');
        }
        // Effectuez l'appel API GET
        return this.apiService.get(endpoint);
    }



}
