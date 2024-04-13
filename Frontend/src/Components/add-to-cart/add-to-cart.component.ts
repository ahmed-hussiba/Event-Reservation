import { Component, NgModule, OnInit } from '@angular/core';
import { SharedEventsService } from '../../Services/shared-events.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../Services/login.services';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [UserService],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent implements OnInit {
  event: any;
  cartItem: any;
  level: any;

  constructor(
    private sharedService: SharedEventsService,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.sharedService.data.subscribe((data) => {
      this.event = data;
      console.log(this.event);
    });
  }
  silverCount: any = 0;
  platinumCount: any = 0;
  goldCount: any = 0;
  quantity: any;
  price: any;

  Add(name: string) {
    this.level = name;
    switch (name) {
      case 'golden':
        if (this.silverCount == 0 && this.platinumCount == 0) {

          this.goldCount++;
          this.quantity = this.goldCount;
          this.price = this.event['EventwithImg'].event.ticketsAvailable[1].price;
        }
        break;
      case 'silver':
        if (this.goldCount == 0 && this.platinumCount == 0) {

          this.silverCount++;
          this.quantity = this.silverCount;
          this.price = this.event['EventwithImg'].event.ticketsAvailable[0].price;
        }
        break;
      case 'platinum':
        if (this.silverCount == 0 && this.goldCount == 0) {
          this.platinumCount++;
          this.quantity = this.platinumCount;
          this.price = this.event['EventwithImg'].event.ticketsAvailable[2].price;
        }
        break;
    }
  }
  Minus(name: string) {
    switch (name) {
      case 'golden':
        if (this.goldCount > 0) this.goldCount--;
        this.quantity = this.goldCount;
        break;
      case 'silver':
        if (this.silverCount > 0) this.silverCount--;
        this.quantity = this.silverCount;
        break;
      case 'platinum':
        if (this.platinumCount > 0) this.platinumCount--;
        this.quantity = this.platinumCount;
        break;
    }
  }

  AddToCart() {
    /////////////////////DON'T SEND UNLESS QUANTITY > 1/////////////////////
    this.cartItem = {
      eventId: +this.event['EventwithImg'].event._id,
      eventName: this.event['EventwithImg'].event.name,
      ticketLevel: this.level,
      quantity: this.quantity,
      ticketPrice: this.price,
    };

    console.log(this.cartItem);

    this.userService.AddItemToCart(this.cartItem).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
