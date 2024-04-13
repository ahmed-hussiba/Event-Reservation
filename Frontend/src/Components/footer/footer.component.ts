import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  providers: [ReviewService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(private reviewService: ReviewService, private router: Router) {}
  AddReview(message: string) {
    const token = localStorage.getItem('access_token');
    if (token) {
      let obj = { body: message };
      console.log(obj);
      
      this.reviewService.AddReview(obj).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
