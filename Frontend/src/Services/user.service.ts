import { LoginService } from './login.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: any;
  private DB_URL = 'http://localhost:7000/api/users';
  constructor(private http: HttpClient, private loginService: LoginService) {}
  GetUserByID() {
    this.token = this.loginService.getToken();
    let userID;
    if (this.token) {
      const decoded = jwtDecode(this.token);
      userID = Object.values(decoded)[0];
    }
    return this.http.get(this.DB_URL + '/' + userID);
  }

  AddItemToCart(item:any){
    this.token = this.loginService.getToken();
    console.log(this.token);
    let userID;
    if (this.token) {
      const decoded = jwtDecode(this.token);
      userID = Object.values(decoded)[0];
    }
   return this.http.post(this.DB_URL+"/"+userID+"/cart",item);
  }
}
