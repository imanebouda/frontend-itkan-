import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root',
  })
  export class SharedDataService {
    private selectedProcessusSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    selectedProcessus$: Observable<any> = this.selectedProcessusSubject.asObservable();
  
    constructor() {}
  
    setSelectedProcessus(processus: any) {
      this.selectedProcessusSubject.next(processus);
    }
  }