import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstatModel } from 'src/app/models/constat.model';
import { TypeContat } from 'src/app/models/type-contat.model';

@Injectable({
  providedIn: 'root'
})
export class ConstatService {
    private baseUrl = 'https://localhost:44305/api/Constat';
  private typeConstatUrl = 'https://localhost:44305/api/TypeConstat';

  constructor(private http: HttpClient) {}

  getConstats(): Observable<ConstatModel[]> {
    return this.http.get<ConstatModel[]>(this.baseUrl);
  }

  createConstat(constat: ConstatModel): Observable<ConstatModel> {
    return this.http.post<ConstatModel>(this.baseUrl, constat);
  }

  getTypeConstats(): Observable<TypeContat[]> {
    return this.http.get<TypeContat[]>(this.typeConstatUrl);
  }
}
