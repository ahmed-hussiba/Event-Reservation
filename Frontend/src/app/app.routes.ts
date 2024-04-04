import { Routes } from '@angular/router';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { AddToCartComponent } from '../Components/add-to-cart/add-to-cart.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  //   { path: '**', component: AddToCartComponent },
];
