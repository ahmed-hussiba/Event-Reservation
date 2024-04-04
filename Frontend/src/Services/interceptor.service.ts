import { LoginService } from './login.services';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private LoginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.LoginService.getToken();
    const reqAuth = req.clone({
      setHeaders: {
        'x-auth-token': `${token}`,
      },
    });
    return next.handle(reqAuth);
  }
}
