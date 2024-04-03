import { Component } from '@angular/core';
import { RegLoginComponent } from '../reg-login/reg-login.component';

@Component({
  selector: 'app-try',
  standalone: true,
  imports: [
    RegLoginComponent
  ],
  templateUrl: './try.component.html',
  styleUrl: './try.component.css'
})
export class TryComponent {

}
