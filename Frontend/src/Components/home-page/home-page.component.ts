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
  ],
  providers: [LoginService, UserService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  token: any;
  IsAdmin: boolean = false;
  UserImg: any;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.loginService.getToken();

    console.log("Token: \n" + this.token);

    if (this.token) {
      const decoded = jwtDecode(this.token);
      console.log(decoded);

      let email = Object.values(decoded)[3];

      console.log(Object.values(decoded)[3]);
      if (email.includes('@admin.com')) {
        this.IsAdmin = true;
      }
      this.userService.GetUserByID().subscribe({
        next: (data) => {
          console.log(Object.values(data)[0].imageUser);
          this.UserImg = Object.values(data)[0].imageUser;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
