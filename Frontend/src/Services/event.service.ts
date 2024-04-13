import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // private DB_URL = 'http://localhost:7000/api/event';
  private DB_URL = 'https://event-reservation-2.onrender.com/api/event';


  constructor(private http: HttpClient) {}

  GetAllEvents() {
    return this.http.get(this.DB_URL);
  }

  GetEventById(id: Number) {
    return this.http.get(this.DB_URL + '/' + id);
  }

  GetPromotedEvets() {
    return this.http.get(this.DB_URL + '/promoted');
  }
  
  GetEventByCategoryName(name:string){
    return this.http.get(this.DB_URL +"/category/"+name);
  }

}
