import { Routes } from '@angular/router';
import { AboutComponent } from '../Components/about/about.component';
import { AddToCartComponent } from '../Components/add-to-cart/add-to-cart.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { EventDetailsComponent } from '../Components/event-details/event-details.component';

export const routes: Routes = [
    {path:'', component: HomePageComponent},
    { path: 'eventdetails', component: EventDetailsComponent },
];
