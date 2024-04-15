import { Component } from '@angular/core';
import { GuestHeaderLinksComponent } from '../guest-header-links/guest-header-links.component';
import { RegLoginComponent } from '../reg-login/reg-login.component';

@Component({
  selector: 'app-redirected-login',
  standalone: true,
  imports: [GuestHeaderLinksComponent, RegLoginComponent],
  templateUrl: './redirected-login.component.html',
  styleUrl: './redirected-login.component.css'
})
export class RedirectedLoginComponent {

}
