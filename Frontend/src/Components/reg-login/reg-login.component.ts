import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.services';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reg-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers:[LoginService],
  templateUrl: './reg-login.component.html',
  styleUrl: './reg-login.component.css'
})
export class RegLoginComponent {
  user:any;
  responseData:any;
  responseHeaders:any;
  constructor(private logService:LoginService){

  }
  mySignInFormGroup = new FormGroup(
    {
      email:new FormControl("",[Validators.email,Validators.required]),
      password:new FormControl("",[Validators.pattern(
        "^(?=.*[a-zA-Z])(?=.*\\d).{8,}$"
        ),Validators.required]) 
    })

  get emailIsValid(){
    return this.mySignInFormGroup.controls["email"].valid;
  }
  get passwordIsValid(){
    return this.mySignInFormGroup.controls["password"].valid;
  }

  submitSignIn(){
    if(this.mySignInFormGroup.valid)
    {
      this.user = this.mySignInFormGroup.value
      this.logService.signIn(this.user).subscribe(
        (response: HttpResponse<any>) => {
          const token = response.headers.get("x-auth-token")
          console.log(token);
          
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
}
