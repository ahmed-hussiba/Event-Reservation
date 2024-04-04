import { Routes } from '@angular/router';
import { AboutComponent } from '../Components/about/about.component';
import { EventDetailsComponent } from '../Components/event-details/event-details.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { AddToCartComponent } from '../Components/add-to-cart/add-to-cart.component';
import { RegLoginComponent } from '../Components/reg-login/reg-login.component';
import { guardAuthGuard } from '../Guards/guard.auth.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'eventdetails',
    component: EventDetailsComponent,
    canActivate: [guardAuthGuard],
  },
  { path: 'login', component: RegLoginComponent },
];
