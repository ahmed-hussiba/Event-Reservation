import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private DB_URL = 'http://localhost:7000/api/login';

  http = inject(HttpClient);
  constructor() {}

  //sign in
  signIn(user: any): Observable<any> {
    return this.http.post(this.DB_URL, user, { observe: 'response' });
  }


  GetPromotedEvets() {
    return this.http.get(this.DB_URL + '/promoted');
  }

  getToken() {
    const token = localStorage.getItem('access_token');
    return token;
  }

  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('access_token');
  //   return !this.jwtHelper.isTokenExpired(token);
  // }
}
