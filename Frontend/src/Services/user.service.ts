import { LoginService } from './login.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../Interfaces/jwt-payload';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userID: any;
  private token: any;
  // private DB_URL = 'http://localhost:7000/api/users';
  private DB_URL = 'https://event-reservation-2.onrender.com/api/users';
  constructor(private http: HttpClient, private loginService: LoginService) {}
  GetUserByID() {
    this.token = this.loginService.getToken();
    if (this.token) {
      const decoded = jwtDecode(this.token);
      this.userID = Object.values(decoded)[0];
    }
    return this.http.get(this.DB_URL + '/' + this.userID);
  }

  AddItemToCart(item: any) {
    this.token = this.loginService.getToken();
    // console.log(this.token);
    let userID;
    if (this.token) {
      const decoded = jwtDecode(this.token) as JwtPayload;
      const { userID : id } = decoded;
      userID = id;
    } 
    return this.http.post(this.DB_URL + '/' + userID + '/cart', item);
  }

  getCart(id: Number) {
    return this.http.get(this.DB_URL + '/' + id + '/cart');
  }

  deleteFromCart (cartItem: any) {
    this.token = this.loginService.getToken();
    const item = cartItem;
    let userId;

    if (this.token) {
      const decoded = jwtDecode(this.token) as JwtPayload;
      const {userID : id} = decoded;
      userId = id;
    }

    return this.http.put(this.DB_URL + "/" + userId +"/cart", item);
  }

  EditProfile(user: any) {
    if (this.token) {
      const decoded = jwtDecode(this.token);
      this.userID = Object.values(decoded)[0];
    }
    return this.http.put(this.DB_URL + '/' + this.userID, user);
  }
}
