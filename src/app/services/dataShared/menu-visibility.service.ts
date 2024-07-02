import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuVisibilityService {
  private isMenuVisibleSubject = new BehaviorSubject<boolean>(false);
  isMenuVisible$ = this.isMenuVisibleSubject.asObservable();


 setMenuVisibility(isVisible: boolean) {
    this.isMenuVisibleSubject.next(isVisible);
  }
  
}