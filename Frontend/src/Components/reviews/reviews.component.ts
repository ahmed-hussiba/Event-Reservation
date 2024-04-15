import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
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


  @ViewChild('next') myDiv!: ElementRef<HTMLElement>;


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

  ngAfterViewInit() {
    this.triggerFalseClick();
  }

  
  toggle() {
    this.flag = false;
    console.log("reviewsss");
    
  }

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    setInterval(() => {
      el.click();
    },2000)
  }
}
