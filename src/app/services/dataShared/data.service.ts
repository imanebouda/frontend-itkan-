import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedItemIdSource = new BehaviorSubject<number>(0);
  selectedItemId$ = this.selectedItemIdSource.asObservable();


 setSelectedItemId(id: number) {
    this.selectedItemIdSource.next(id);
  }
}