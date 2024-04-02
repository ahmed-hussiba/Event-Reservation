import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeaderLinksComponent } from '../Components/user-header-links/user-header-links.component';
import { GuestHeaderLinksComponent } from '../Components/guest-header-links/guest-header-links.component';
import { RegLoginComponent } from '../Components/reg-login/reg-login.component';
import { PromotionEventsComponent } from '../Components/promotion-events/promotion-events.component';
import { CategoriesComponent } from '../Components/categories/categories.component';
import { ReviewsComponent } from '../Components/reviews/reviews.component';
import { AddToCartComponent } from '../Components/add-to-cart/add-to-cart.component';
import { EventDetailsComponent } from '../Components/event-details/event-details.component';
import { EventsComponent } from '../Components/events/events.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
              UserHeaderLinksComponent,
            GuestHeaderLinksComponent,
            RegLoginComponent,
            PromotionEventsComponent,
            CategoriesComponent,
            ReviewsComponent,
            AddToCartComponent,
            EventDetailsComponent,
            EventsComponent
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
