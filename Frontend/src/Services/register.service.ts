import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  // private DB_URL = "http://localhost:7000/api/register";
  private DB_URL = 'https://event-reservation-5.onrender.com/api/register';

  //sign up
  signUp(user: any): Observable<any> {
    return this.http.post(this.DB_URL, user, { observe: 'response' });
  }

  // GetPromotedEvets(){
  //   return this.http.get(this.DB_URL + "/promoted")
  // }
}
