import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../Services/order.service.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { BarchartComponent } from "../barchart/barchart.component";

@Component({
    selector: 'app-admin-show-orders',
    standalone: true,
    providers: [OrderServiceService, UserService],
    templateUrl: './admin-show-orders.component.html',
    styleUrl: './admin-show-orders.component.css',
    imports: [BarchartComponent]
})
export class AdminShowOrdersComponent implements OnInit {
  constructor(
    private orderService: OrderServiceService,
    private userService: UserService
  ) {}
  allOrders: any;
  allUsers: any;
  ngOnInit(): void {
    // Fetch all orders
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        console.log(orders);
        this.allOrders = orders;
        this.allOrders = this.allOrders.data;

        // Fetch all users
        this.userService.GetAllUsers().subscribe({
          next: (users) => {
            this.allUsers = users;

            // Match orders with users based on user IDs
            
          },
          error: (err) => {
            console.log(err);
          },
        });
        console.log(this.allOrders);
     
      },
      error: (err) => {
        console.log(err);
      },
    });
    for (let order of this.allOrders) {
      // Find the user associated with the current order
      let user = this.allUsers.find(
        (u: { _id: any; }) => u._id === order.user_id
      );
      if (user) {
        // Assign user data to the order
        order.user = {
          username: user.username,
          email: user.email,
        };
      }

    }
  }
}
