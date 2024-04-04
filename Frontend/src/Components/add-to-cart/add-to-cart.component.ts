import { Component, OnInit } from '@angular/core';
import { SharedEventsService } from '../../Services/shared-events.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent implements OnInit{
  event:any;
  constructor(private sharedService:SharedEventsService){}
  ngOnInit(): void {
    this.sharedService.data.subscribe(
      data=>{
        this.event = data;
      }
    )
  }


}
