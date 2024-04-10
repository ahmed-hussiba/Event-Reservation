import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-header-links',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-header-links.component.html',
  styleUrl: './user-header-links.component.css',
})
export class UserHeaderLinksComponent {
  @Input() UserImg: any;


  LogOut() {
    // console.log("LOGGING OUT");
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}


