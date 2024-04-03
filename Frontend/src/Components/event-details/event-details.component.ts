import { Component, OnInit } from '@angular/core';
import { RegLoginComponent } from '../reg-login/reg-login.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { SharedEventsService } from '../../Services/shared-events.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    RegLoginComponent,
    ReviewsComponent,
    AddToCartComponent,
  ],
  providers: [
    SharedEventsService
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})

export class EventDetailsComponent implements OnInit {

  eventId: Number | undefined;
  constructor(private sharedService: SharedEventsService) { }


  ngOnInit(): void {
    
    this.sharedService.data$.subscribe(
      // data => {
      //   console.log("data");
      //   this.eventId = data;
      // }
      {
        next: (data) => {console.log(data);
        }
      }
    )

    console.log(this.eventId);

  }


}
