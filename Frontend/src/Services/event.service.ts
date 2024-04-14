import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsToEventDetailsService } from './events.to.event-details.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private EventID:any;
  private DB_URL = 'http://localhost:7000/api/event';

  constructor(private http: HttpClient, private evService:EventsToEventDetailsService) {}

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
  AddEvent(event:any):Observable<any>{
    return this.http.post(this.DB_URL,event , { observe: 'response' });
  }
  UpdateEvent(id :any,event:any){
   
    return this.http.post(this.DB_URL,id,event);
  }

}
