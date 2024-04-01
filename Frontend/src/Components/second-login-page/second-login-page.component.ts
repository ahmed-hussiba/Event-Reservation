import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-second-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './second-login-page.component.html',
  styleUrl: './second-login-page.component.css'
})
export class SecondLoginPageComponent {
  wrapperActive: boolean = true;

  toggleWrapper() {
    this.wrapperActive = !this.wrapperActive;
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
      //Call service
    }
  }
}
