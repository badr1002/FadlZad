import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../pages/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _user: UserService, private _route: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<boolean> {
    return this._user
      .getUser()
      .toPromise()
      .then((res): any => {
        if (res.apiStatus) {
          let user = res.data
          if (res.data.role === "adf0c9ad82601330d46ec62a") {
            user = Object.assign({ isAdmin: true }, user);
            delete user.role            
          }  
          localStorage.setItem("user", JSON.stringify(user))
          this._user.profileImage = res.data.image
          if (!res.data.activate) this._route.navigateByUrl('/activationError')
          return true;
        } else {
          this._route.navigateByUrl('/user/login')
        }
      })
      .catch((e) => {
        this._route.navigateByUrl('/user/login');
        return false;
      });
  }
}
