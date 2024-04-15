import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
export const guardAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    let login = document.getElementById('exampleModal') as HTMLInputElement;

    console.log(login);

    return false;
  }
};
