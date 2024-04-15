import { RegLoginComponent } from '../reg-login/reg-login.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { SharedEventsService } from '../../Services/shared-events.service';
import { EventService } from '../../Services/event.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    RegLoginComponent,
    ReviewsComponent,
    AddToCartComponent,
    UserHeaderLinksComponent,
    FooterComponent
  ],
  providers: [EventService],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent implements OnInit {
  eventId:any;

  constructor(
    private sharedService: SharedEventsService,
    private eventService: EventService,
    private route:ActivatedRoute
  ) {}

  event: any;
  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get("id");
    console.log(this.eventId);

    this.eventService.GetEventById(this.eventId).subscribe({
      next: (data) => {
        this.event = data;
        this.sharedService.setData(this.event);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
