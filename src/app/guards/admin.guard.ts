import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private securityService:SecurityService, private router:Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAdmin = JSON.parse(localStorage.getItem('user')).roles.find( e=>e.roleName=="ADMIN")!=undefined;

      if(isAdmin) {
        //this.router.navigate(['menu']);
        return true;
      }

      //this.router.navigate(['/403']);
    return false;
  }
  
}
