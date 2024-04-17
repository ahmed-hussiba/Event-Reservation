import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http:HttpClient) { }
  // private DB_URL = 'http://localhost:7000/api/payment';
  private DB_URL = 'https://event-reservation-4.onrender.com/api/payment';
  Pay(totalPrice:any) {
    return this.http.post(this.DB_URL+'/pay',{totalPrice});
  }


}
