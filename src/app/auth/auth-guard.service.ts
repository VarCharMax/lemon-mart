import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UiService } from '../common/ui.service';
import { AuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus = <IAuthStatus>{};
  constructor(
    protected authService: AuthService,
    protected router: Router,
    private uiService: UiService
  ) {
    this.authService.authStatus.subscribe(
      (authStatus) => (this.currentAuthStatus = authStatus)
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(childRoute);
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let roleMatch = true;
    let params = {};

    if (route) {
      const expectedRole = route.data['expectedRole'];

      if (expectedRole) {
        roleMatch = this.currentAuthStatus.userRole == route.data['expectedRole'];
      }

      if (roleMatch) {
        params = { redirectUrl: route.pathFromRoot.map((r) => r.url).join('/') };
      }
    }

    if (!this.currentAuthStatus.isAuthenticated || !roleMatch) {
      this.showAlert(this.currentAuthStatus.isAuthenticated, roleMatch);

      this.router.navigate(['login', params || {}]);

      return false;
    }

    return true;
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }

    if (!roleMatch) {
      this.uiService.showToast('You do not have the permissions to view this resource');
    }
  }
}
