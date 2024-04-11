import { Component, OnInit } from '@angular/core';
import { ReviewsComponent } from '../reviews/reviews.component';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { GuestHeaderLinksComponent } from '../guest-header-links/guest-header-links.component';
import { LoginService } from '../../Services/login.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ReviewsComponent,
    UserHeaderLinksComponent,
    GuestHeaderLinksComponent,
    CommonModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  token:any;
  constructor (private loginService:LoginService){}
  ngOnInit(): void {
    this.token = this.loginService.getToken();
  }
  
  
}
