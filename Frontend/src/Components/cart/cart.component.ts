import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { LoginService } from '../../Services/login.services';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedEventsService } from '../../Services/shared-events.service';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserHeaderLinksComponent,
    FooterComponent
  ],
  providers: [
    UserService,
    LoginService
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any;
  orderPrice: number = 0;
  orderQuantity: number = 0;
  userID: any;
  orderDetails: { eventId: number, numberOfTickets: number, totalPrice: number, level: string }[] = [];
  constructor(
    private userService: UserService,
    private loginServie: LoginService,
    private sharedService: SharedEventsService,
    private router:Router
  ) { }
  ngOnInit(): void {
    const token: any = this.loginServie.getToken()
    const decoded = jwtDecode(token)
    this.userID = Object.values(decoded)[0]

    this.userService.getCart(+this.userID).subscribe(
      {
        next: (data) => {
          
          this.cartItems = data;
          
          this.calc();
          this.sharedService.setData(this.cartItems);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  calc() {
    for (let i = 0; i < this.cartItems.cart.length; i++) {

      this.orderPrice += this.cartItems.cart[i].ticketPrice * this.cartItems.cart[i].quantity;
      this.orderQuantity += this.cartItems.cart[i].quantity;
    }
  }

  checkOut() {
    if(this.cartItems.cart.length!=0)
      {

        for (let i = 0; i < this.cartItems.cart.length; i++) {
          this.orderDetails.push(
            {
              eventId: this.cartItems.cart[i].eventId,
              numberOfTickets: this.cartItems.cart[i].quantity,
              totalPrice: this.cartItems.cart[i].quantity * this.cartItems.cart[i].ticketPrice,
              level: this.cartItems.cart[i].ticketLevel
            }
          )
        }
        
        let order = {
          totalPrice: this.orderPrice,
          countOfTickets: this.orderQuantity,
          orderDetails: this.orderDetails
        };
        
        this.sharedService.setData(order);
        this.router.navigate([`/users/${this.userID}/payment`])
      }
  }


  removeFromCart(item: any) {
    // console.log(item);
    if (confirm("Do you want to remove this item from the cart")) {
      this.userService.deleteFromCart(item).subscribe(
        {
          next: (data) => {
            let d = data;
            console.log(d);
          },

          error: (er) => {
            console.log(er);
          }
        }
      )

      window.location.reload();
    }
  }

}
