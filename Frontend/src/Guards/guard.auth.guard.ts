import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../Services/login.services';

export const guardAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let log = LoginService;
  if (inject(log).getToken()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
