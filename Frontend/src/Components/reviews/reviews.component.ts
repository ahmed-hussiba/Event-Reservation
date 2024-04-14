import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  providers: [ReviewService],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
  counter: any;
  review: any;
  reviews: any;
  flag: boolean = true;
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.GetAllReviews().subscribe({
      next: (data) => {
        this.review = data;
        console.log(this.review);
        
        this.reviews = this.review.reviewsWithImgs;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  toggle() {
    this.flag = false;
    console.log("reviewsss");
    
  }
}
