import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../Services/order.service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-show-orders',
  standalone: true,
  imports: [HttpClientModule,],
  providers:[OrderServiceService],
  templateUrl: './admin-show-orders.component.html',
  styleUrl: './admin-show-orders.component.css'
})
export class AdminShowOrdersComponent implements OnInit {
constructor(private orderService:OrderServiceService){}
allOrders:any
  ngOnInit(): void {
    this.orderService.GetAllOrders().subscribe({
      next:(data)=>{
        console.log(data);
        this.allOrders=data;
      },
      error:(err)=>{
        console.log(err);
      }

    })
  }
  

}
