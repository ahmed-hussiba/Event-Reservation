import { inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    const decoded = jwtDecode(token);
    
    
    let email = Object.values(decoded)[3]
    console.log(email);
    if(email.includes('admin'))
      return true;
    else
    {
      inject(Router).navigate(['**']);
      return false;
    }
    
  } else {
    inject(Router).navigate(['/login']);
    let login = document.getElementById('exampleModal') as HTMLInputElement;

    console.log(login);

    return false;
  }
};
