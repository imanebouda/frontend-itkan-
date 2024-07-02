import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { GeneralService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AutorisedGuard implements CanActivate {
  constructor(private generalService: GeneralService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var role = route.data['role']
    if (this.generalService.canActivate(role))
      return this.generalService.canActivate(role)
    else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

}