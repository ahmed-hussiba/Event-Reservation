import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedEventsService } from '../../Services/shared-events.service';
import { OrderServiceService } from '../../Services/order.service.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  order:any;
  constructor(private serv:SharedEventsService,private orderService:OrderServiceService){}
  ngOnInit(): void {
    
    this.serv.data.subscribe(
      {
        next:(data)=>{
          this.order = data
        },
        error:(err)=>{
          console.log(err);
        }
      }
    )
    console.log(this.order)
  }

  makeOrder(){
    this.orderService.makeOrder(this.order).subscribe({next:(data)=>{
      console.log(data);

    },
    error:(err)=>{
      console.log("error: ",err);
    }
  }
  );
  }

}
