import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-header-links',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-header-links.component.html',
  styleUrl: './user-header-links.component.css',
})
export class UserHeaderLinksComponent implements OnInit {
  constructor(private userService: UserService) {}
  cart: any;
  UserImg: any;
  cartLength: any;
  ngOnInit(): void {
    console.log("Heaedr");

    let token = localStorage.getItem('access_token');

    if (token) {
      let data = jwtDecode(token);
      let UserID = +Object.values(data)[0];
      this.userService.getCart(UserID).subscribe({
        next: (data) => {
          this.cart = data;
          this.cartLength = this.cart.cartLength;
        },
        error: (err) => {
          console.log(err);
        },
      });

      //retrieve img
      // this.userService.GetUserByID().subscribe({
      //   next: (data) => {
      //     console.log(data);

      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });
      this.userService.GetUserByID().subscribe({
        next: (data) => {
          this.UserImg = data;
          this.UserImg = this.UserImg.resObj.imageUser;

          // console.log(this.UserImg);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  LogOut() {
    // console.log("LOGGING OUT");
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}
