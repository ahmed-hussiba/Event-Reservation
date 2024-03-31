import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './reg-login.component.html',
  styleUrl: './reg-login.component.css'
})
export class RegLoginComponent {
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
      //Call service
    }
  }
}
