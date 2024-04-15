import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { GuestHeaderLinksComponent } from '../guest-header-links/guest-header-links.component';
import { EventsComponent } from '../events/events.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { PromotionEventsComponent } from '../promotion-events/promotion-events.component';
import { TryComponent } from '../try/try.component';
import { LoginService } from '../../Services/login.services';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../Services/user.service';
import { AllEventsComponent } from '../all-events/all-events.component';
import { JwtPayload } from '../../Interfaces/jwt-payload';
import { IntroSectionComponent } from '../intro.section/intro.section.component';
import { EventService } from '../../Services/event.service';
import { FooterComponent } from '../footer/footer.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { Router } from '@angular/router';

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
    TryComponent,
    CommonModule,
    AllEventsComponent,
    IntroSectionComponent,
    FooterComponent,
    AdminHomeComponent
  ],
  providers: [LoginService, UserService,EventService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  token: any;
  IsAdmin: boolean = false;
  events:any;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private evService: EventService,
    private router:Router
  ) {}

  ngOnInit(): void {

    console.log("Home");

    //#region Role check
    this.token = this.loginService.getToken();

    // console.log('Token: \n' + this.token);

    if (this.token) {
      const decoded = jwtDecode(this.token) as JwtPayload;
      // console.log(decoded);

      const { userEmail: email, imageURL, userName, userID } = decoded;

      // let {userEmail} = decoded;

      // console.log(Object.values(decoded));

      if (email.includes('@admin.com')) {
        this.IsAdmin = true;
        this.router.navigate(['/admin'])
        
      }
    }
    //#endregion
    this.evService.GetPromotedEvets().subscribe(
      {
        next: (data) => {
          this.events = data;
        },
        error: (err) => { console.log(err); }
      }
    );
  }
  
}
