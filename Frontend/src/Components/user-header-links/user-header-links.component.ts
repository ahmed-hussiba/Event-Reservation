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
  constructor(private userService:UserService){}
  cart:any;
  cartLength:any;
  ngOnInit(): void {
    let token = localStorage.getItem('access_token')
    
    if(token)
    {
        let data = jwtDecode(token);
        this.userService.getCart(+Object.values(data)[0]).subscribe({
          next:(data)=>{
            this.cart = data;
            this.cartLength = this.cart.cartLength;
            console.log(this.cartLength);
          },
        })
    }
      
    
  }
  @Input() UserImg: any;


  LogOut() {
    // console.log("LOGGING OUT");
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}


