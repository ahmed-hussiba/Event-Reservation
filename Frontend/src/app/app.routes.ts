import { Routes } from '@angular/router';
import { AboutComponent } from '../Components/about/about.component';
import { EventDetailsComponent } from '../Components/event-details/event-details.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { AddToCartComponent } from '../Components/add-to-cart/add-to-cart.component';
import { RegLoginComponent } from '../Components/reg-login/reg-login.component';
import { guardAuthGuard } from '../Guards/guard.auth.guard';
import { CartComponent } from '../Components/cart/cart.component';
import { PaymentComponent } from '../Components/payment/payment.component';
import { AllEventsComponent } from '../Components/all-events/all-events.component';
import { ProfileComponent } from '../Components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'eventdetails', component: EventDetailsComponent,
    canActivate: [guardAuthGuard],
  },
  { path: 'login', component: RegLoginComponent },
  { path: 'event/category/:name', component: AboutComponent },
  {
    path: 'users/cart', component: CartComponent,
    canActivate: [guardAuthGuard]
  },
  {
    path: 'users/:id/payment', component: PaymentComponent,
    canActivate: [guardAuthGuard],

  },
  {
    path: 'event/allevents', component: AllEventsComponent,
    canActivate: [guardAuthGuard],

  },
  { path: 'about', component: AboutComponent },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [guardAuthGuard],

  },
];
