import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.services';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { RegisterService } from '../../Services/register.service';

@Component({
  selector: 'app-reg-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,

  ],
  providers: [LoginService, RegisterService],
  templateUrl: './reg-login.component.html',
  styleUrl: './reg-login.component.css'
})
export class RegLoginComponent {
  user: any;
  responseData: any;
  responseHeaders: any;
  constructor(private logService: LoginService, private regService: RegisterService) { }

  fileValidator(control: FormControl) {
    const file = control.value as File;
    if (!file) {
      return { required: true };
    }
    return null;
  }
  mySignInFormGroup = new FormGroup(
    {
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.pattern(
        "^(?=.*[a-zA-Z])(?=.*\\d).{8,}$"
      ), Validators.required])
    });

  mySignUpFormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern("^[a-zA-Z0-9_.]+$")]),
    password: new FormControl("", [Validators.pattern(
      "^(?=.*[a-zA-Z])(?=.*\\d).{8,}$"
    ), Validators.required]),
    country: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    fileUpload: new FormControl("", [Validators.required]) // Add the file validator here
  });

  get emailIsValid() {
    return this.mySignInFormGroup.controls["email"].valid;
  }
  get passwordIsValid() {
    return this.mySignInFormGroup.controls["password"].valid;
  }

  get isValidRegisterEmail() {
    return this.mySignUpFormGroup.controls["email"].valid;
  }

  get isValidRegisterPassword() {
    return this.mySignUpFormGroup.controls["password"].valid;
  }

  get isValidRegisterUserName() {
    return this.mySignUpFormGroup.controls["username"].valid;
  }

  get isValidRegisterCity() {
    return this.mySignUpFormGroup.controls["city"].valid;
  }

  get isValidRegisterCountry() {
    return this.mySignUpFormGroup.controls["country"].valid;
  }



  submitSignUp() {

    if (this.mySignUpFormGroup.valid) {
      this.user = this.mySignUpFormGroup.value;
      console.log(this.user);
      this.regService.signUp(this.user).subscribe(
        {
          next: (data) => {
            console.log(data);
          },
          error:(err)=>{
            console.log(err);
            
          }
        }
      )
    }
    else {
      console.log("Invalid");
    }

  }

  submitSignIn() {
    if (this.mySignInFormGroup.valid) {
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

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}
