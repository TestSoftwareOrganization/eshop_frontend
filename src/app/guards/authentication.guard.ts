import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router){}

  // we could return Observable<boolean>, if we want to request the back-end
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
    
  }
  isUserLoggedIn(): boolean {
    if(this.authenticationService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    // TODO: send notification to user
    return false;
  }
  
}
 