import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProcessusService {
    private apiUrl = 'https://localhost:44305/api/processus';

    constructor(private http: HttpClient) { }

    getProcessusList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
