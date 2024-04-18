import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // private DB_URL = 'http://localhost:7000/api/event';
  private DB_URL = 'https://event-reservation-5.onrender.com/api/event';

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

  GetEventByCategoryName(name: string) {
    return this.http.get(this.DB_URL + '/category/' + name);
  }
  AddEvent(event: any): Observable<any> {
    return this.http.post(this.DB_URL, event, { observe: 'response' });
  }
  UpdateEvent(id: any, event: any) {
    return this.http.put(this.DB_URL + '/' + id, event);
  }
  DeleteEvent(id: any) {
    return this.http.delete(this.DB_URL + '/' + id);
  }
}
