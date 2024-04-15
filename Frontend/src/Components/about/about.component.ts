import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { GuestHeaderLinksComponent } from '../guest-header-links/guest-header-links.component';
import { LoginService } from '../../Services/login.services';
import { CommonModule } from '@angular/common';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AddReviewComponent } from '../add-review/add-review.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AddReviewComponent,
    UserHeaderLinksComponent,
    GuestHeaderLinksComponent,
    CommonModule,
    FooterComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit,AfterViewInit {
  token:any;
  tokenFlag:any;
  constructor (private loginService:LoginService){}
  ngAfterViewInit(): void {
    window.addEventListener('scroll', function() {
      var box = document.querySelectorAll('.item');
      for (let i = 0; i < box.length; i++) {
        var boxPosition = box[i]?.getBoundingClientRect().top;
        var screenPosition = window.innerHeight;
      if (boxPosition! < screenPosition) {
        box[i]?.classList.add('fade-in');
      }
        
      }
    });
  }
  ngOnInit(): void {

    this.token = this.loginService.getToken();

    if (this.token) {
      const decoded = jwtDecode(this.token) as JwtPayload;
      if(decoded)
        {
          this.tokenFlag = true;
        }
        else{
          this.tokenFlag = false;
        }
    }
  }
  
  
}
