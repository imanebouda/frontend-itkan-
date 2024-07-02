import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { GeneralService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class IsSuperAdminGuard implements CanActivate {
  constructor(private generalService:GeneralService,private router: Router) { }

  canActivate(): boolean {
    if (this.generalService.get_DataSession("Roles_name") == "Super admin") {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }

}
