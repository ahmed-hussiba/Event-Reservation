import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  // private DB_URL = 'http://localhost:7000/api/reviews';
  private DB_URL = 'https://event-reservation-2.onrender.com/api/reviews';
  
  constructor(private http: HttpClient) {}
  
  AddReview(message: any) {
    return this.http.post(this.DB_URL, message);
  }
  GetAllReviews() {
    return this.http.get(this.DB_URL);
  }
}
