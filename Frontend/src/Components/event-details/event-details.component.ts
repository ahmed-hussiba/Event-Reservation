import { Component } from '@angular/core';
import { RegLoginComponent } from '../reg-login/reg-login.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    RegLoginComponent,
    ReviewsComponent,
    AddToCartComponent
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

}
