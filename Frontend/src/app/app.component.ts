import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeaderLinksComponent } from '../Components/user-header-links/user-header-links.component';
import { GuestHeaderLinksComponent } from '../Components/guest-header-links/guest-header-links.component';
import { RegLoginComponent } from '../Components/reg-login/reg-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
              UserHeaderLinksComponent,
            GuestHeaderLinksComponent,RegLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
