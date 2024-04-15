import { Component } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [],
  providers: [ReviewService],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {
  reviewError  : any = null;
  isSignedIn : any = null;
  constructor(private reviewService: ReviewService, private router: Router) {}
  AddReview(message: string) {
    const token = localStorage.getItem('access_token');
    if (token) {
      let obj = { body: message };
      this.isSignedIn = true;
      
      this.reviewService.AddReview(obj).subscribe({
        next: (data) => {
          console.log(data);
          this.reviewError = false;
        },
        error: (err) => {
          console.log(err);
          this.reviewError = true;
        },
      });
    } else {
      this.isSignedIn = false;
      this.router.navigate(['/login']);
    }
  }
}
