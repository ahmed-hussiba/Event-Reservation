import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedEventsService } from '../../Services/shared-events.service';
import { OrderServiceService } from '../../Services/order.service.service';
import { Route, Router, RouterModule } from '@angular/router';
import { PaymentServiceService } from '../../Services/payment.service.service';
import {render} from 'creditcardpayments/creditCardPayments'
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule,UserHeaderLinksComponent,FooterComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  order:any;
  constructor(private serv:SharedEventsService,
    private orderService:OrderServiceService,
    private router:Router,){
    }
  ngOnInit(): void {
    
    this.serv.data.subscribe(
      {
        next:(data)=>{
          this.order = data
          render({
            id:'#paybalBtn',
            currency:'USD',
            value:this.order.totalPrice,
            onApprove:(details)=>{
              
              console.log(details);
              if(details.status == "COMPLETED")
                {
                  this.orderService.makeOrder(this.order).subscribe({next:(data)=>{
                    console.log(data);
                    window.alert("Payment Succeded");
                    setTimeout(() => {
                      this.router.navigate(["/"]);
                    }, 2000);
                    
                },
                  error:(err)=>{
                    console.log("error: ",err);
                }
                })
            }
            }
          })
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
      window.alert("Payment Succeded");
      // this.router.navigate(["/"]);
    },
    error:(err)=>{
      console.log("error: ",err);
    }
  }
  );
  }
  
}
