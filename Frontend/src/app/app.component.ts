import { IntroSectionComponent } from './../Components/intro.section/intro.section.component';
import { LoginService } from './../Services/login.services';
import { Component, Input, OnInit, Output, inject } from '@angular/core';
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
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { CartComponent } from '../Components/cart/cart.component';
import { PaymentComponent } from '../Components/payment/payment.component';
import { TryComponent } from '../Components/try/try.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { interceptorInterceptor } from '../Services/interceptor.interceptor';
import { AllEventsComponent } from '../Components/all-events/all-events.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { AdminHomeComponent } from '../Components/admin-home/admin-home.component';
import { AdminAllEventsComponent } from '../Components/admin-all-events/admin-all-events.component';
import { AdminAddEventComponent } from '../Components/admin-add-event/admin-add-event.component';
import { AdminShowOrdersComponent } from "../Components/admin-show-orders/admin-show-orders.component";
import { DoughnutChartComponent } from '../Components/doughnut-chart/doughnut-chart.component';
import { BarchartComponent } from '../Components/barchart/barchart.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [LoginService],
    imports: [
        RouterOutlet,
        UserHeaderLinksComponent,
        GuestHeaderLinksComponent,
        RegLoginComponent,
        PromotionEventsComponent,
        CategoriesComponent,
        ReviewsComponent,
        AddToCartComponent,
        EventDetailsComponent,
        EventsComponent,
        HomePageComponent,
        CartComponent,
        PaymentComponent,
        TryComponent,
        AllEventsComponent,
        ProfileComponent,
        IntroSectionComponent,
        AdminHomeComponent,
        AdminAllEventsComponent,
        AdminAddEventComponent,
        AdminShowOrdersComponent,
        DoughnutChartComponent,
        BarchartComponent,
    ]
})
export class AppComponent {
  token: any;
  // http = inject(HttpClient);

  // constructor() {
  //   this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //   });
  // }
  title = 'Frontend';
}
