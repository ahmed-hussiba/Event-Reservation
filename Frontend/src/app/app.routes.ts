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
import { AdminHomeComponent } from '../Components/admin-home/admin-home.component';
import { AdminAddEventComponent } from '../Components/admin-add-event/admin-add-event.component';
import { AdminAllEventsComponent } from '../Components/admin-all-events/admin-all-events.component';
import { AdminUpdateEventComponent } from '../Components/admin-update-event/admin-update-event.component';
import { AdminShowOrdersComponent } from '../Components/admin-show-orders/admin-show-orders.component';

export const routes: Routes = [
  {
    path: '', component: HomePageComponent,

  },
  {
    path: 'eventdetails/:id', component: EventDetailsComponent,
    canActivate: [guardAuthGuard],
  },
  { path: 'login', component: RedirectedLoginComponent },
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
  {
    path:'admin',component:AdminHomeComponent,
    // canActivate:[guardAuthGuard]
  },
  {
    path:'addevent', component:AdminAddEventComponent,
    // canActivate:[guardAuthGuard]

  },
  {
    path:'updateevent/:id', component:AdminUpdateEventComponent,
    // canActivate:[guardAuthGuard]

  },
  {
    path:'admin/allevents' , component:AdminAllEventsComponent,
    // canActivate:[guardAuthGuard]

  },
  {
    path:'admin/allorders' , component:AdminShowOrdersComponent,
    // canActivate:[guardAuthGuard]

  },
  {
    path:'**', component:AboutComponent, 
  }

];
