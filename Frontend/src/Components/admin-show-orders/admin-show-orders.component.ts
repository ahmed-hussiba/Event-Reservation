import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../Services/order.service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-show-orders',
  standalone: true,
  imports: [],
  providers:[OrderServiceService],
  templateUrl: './admin-show-orders.component.html',
  styleUrl: './admin-show-orders.component.css'
})
export class AdminShowOrdersComponent implements OnInit {
constructor(private orderService:OrderServiceService){}
allOrders:any
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({ 
      next:(value)=> {
          console.log(value);
      },
      error:(err)=> {
       console.log(err);
      },
    });
  }
  

}
