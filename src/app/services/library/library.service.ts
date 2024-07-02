import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    constructor(private apiService: ApiService, private http: HttpClient) { }
    
    getProcessusData(){
        const url = `${environment.API_BASE_URL_GENERAL}${environment.api.Processus.GetProcessusData}`;
        return this.apiService.get(url);
    }
}

