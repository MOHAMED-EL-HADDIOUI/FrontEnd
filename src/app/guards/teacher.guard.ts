import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(private securityService:SecurityService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      let isTeacher = JSON.parse(localStorage.getItem('user')).roles.find( e=>e.roleName=="PROF")!=undefined;

      if (isTeacher) {
        //this.router.navigate(['/teacher-area']);
        return true;
      }
      //this.router.navigate(['/403']);
      return false;
    
  }
  
}
