import { Component } from '@angular/core';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { GuestHeaderLinksComponent } from '../guest-header-links/guest-header-links.component';
import { EventsComponent } from '../events/events.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { PromotionEventsComponent } from '../promotion-events/promotion-events.component';
import { TryComponent } from '../try/try.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    UserHeaderLinksComponent,
    GuestHeaderLinksComponent,
    EventsComponent,
    CategoriesComponent,
    ReviewsComponent,
    PromotionEventsComponent,
    TryComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
}
