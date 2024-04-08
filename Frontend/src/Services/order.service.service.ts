import { Injectable } from '@angular/core';
import { LoginService } from './login.services';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  token:any;
  private DB_URL = 'http://localhost:7000/api/orders';
  constructor(private http:HttpClient) { }

  makeOrder(order:any){
    
   return this.http.post(this.DB_URL,order);
  }
}
