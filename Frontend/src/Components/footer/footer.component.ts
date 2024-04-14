import { Router } from '@angular/router';
import { Component } from '@angular/core';
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
