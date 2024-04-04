import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private DB_URL = 'http://localhost:7000/api/login';

  constructor(private http: HttpClient) {}

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
