import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { LoginService } from '../../Services/login.services';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedEventsService } from '../../Services/shared-events.service';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserHeaderLinksComponent
  ],
  providers:[
    UserService,
    LoginService
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems:any;
  orderPrice:number = 0;
  orderQuantity:number = 0;
  userID:any;
  constructor(
    private userService: UserService,
    private loginServie:LoginService,
    private sharedService:SharedEventsService
  ) {}
  ngOnInit(): void {
    const token:any = this.loginServie.getToken()
    const decoded = jwtDecode(token)
    this.userID = Object.values(decoded)[0]
    
    this.userService.getCart(+this.userID).subscribe(
      {
        next:(data)=>{
          this.cartItems = data;
          this.calc();  
          this.sharedService.setData(this.cartItems);
        },
        error:(err)=>{
          console.log(err);
        }
      }
    ) 
  }

  calc()
  {
    for (let i = 0; i < this.cartItems.cart.length; i++) {
      
      this.orderPrice += this.cartItems.cart[i].ticketPrice * this.cartItems.cart[i].quantity;
      this.orderQuantity += this.cartItems.cart[i].quantity;
      console.log(`price:${this.orderPrice}, quantity:${this.orderQuantity}`);
    }
  }

}
