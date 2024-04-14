import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedEventsService {
  private dataSubject = new BehaviorSubject<any>(null);
  data = this.dataSubject.asObservable();
  
  constructor() { }

  setData(data: any) {
    this.dataSubject.next(data);
    console.log(this.data);
  }

}
