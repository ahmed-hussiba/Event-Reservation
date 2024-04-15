import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  providers: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor() {}
}
