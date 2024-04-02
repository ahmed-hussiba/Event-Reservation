import { Component } from '@angular/core';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReviewsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
