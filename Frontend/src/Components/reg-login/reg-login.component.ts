import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../Services/login.services';

import { RegisterService } from '../../Services/register.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { GuestHeaderLinksComponent } from '../guest-header-links/guest-header-links.component';

@Component({
  selector: 'app-reg-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    GuestHeaderLinksComponent,
  ],
  providers: [LoginService, RegisterService],
  templateUrl: './reg-login.component.html',
  styleUrl: './reg-login.component.css',
})
export class RegLoginComponent {
  user: any;
  responseData: any;
  responseHeaders: any;
  image: any;

  registerError: any = null;
  logInError: any = null;

  constructor(
    private logService: LoginService,
    private regService: RegisterService,
    private router: Router
  ) {}
  mySignInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$'),
      Validators.required,
    ]),
  }); //
  mySignUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern('^[a-zA-Z0-9_.]+$'),
    ]),
    gender: new FormControl({
      gender: '',
    }),
    password: new FormControl('', [
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$'),
      Validators.required,
    ]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    fileUpload: new FormControl('', [Validators.required]), // Add the file validator here
  });

  get emailIsValid() {
    return this.mySignInFormGroup.controls['email'].valid;
  }
  get passwordIsValid() {
    return this.mySignInFormGroup.controls['password'].valid;
  }

  get isValidRegisterEmail() {
    return this.mySignUpFormGroup.controls['email'].valid;
  }

  get isValidRegisterPassword() {
    return this.mySignUpFormGroup.controls['password'].valid;
  }

  get isValidRegisterUserName() {
    return this.mySignUpFormGroup.controls['username'].valid;
  }

  get isValidRegisterCity() {
    return this.mySignUpFormGroup.controls['city'].valid;
  }

  get isValidRegisterCountry() {
    return this.mySignUpFormGroup.controls['country'].valid;
  }

  submitSignUp() {
    if (this.mySignUpFormGroup.valid) {
      this.user = this.mySignUpFormGroup.value;
      // this.user._id = 22;

      console.log(this.user.gender);
      // console.log(this.image);

      let formData = new FormData();
      formData.set('image', this.image);
      formData.set('data', JSON.stringify(this.user));
      // formData.set('hassan', JSON.stringify({ img: 5 }));

      // console.log(formData);
      this.regService.signUp(formData).subscribe({
        next: (data) => {
          console.log('REGISTER COMP: REGSERVICE.SIGNUP');
          if (data.body.message != 'already registered') {
            const authToken = data.headers.get('x-auth-token');
            if (authToken) {
              // console.log("authToken: \n" + JSON.stringify(authToken));
              localStorage.setItem('access_token', authToken);
              const decoded = jwtDecode(authToken);
              // console.log('Decoded token \n' + decoded);
              window.location.reload();
            }
          } else {
            alert('Already Registered');
          }

          // console.log('x-auth-token:', authToken);
          // this.router.navigate(['/']);
        },
        error: (err) => {
          this.registerError = true;

          console.log(
            'ERROR CAUGHT: REGISTER COMP->REGSERVICE.SIGNUP->TOKEN ERROR'
          );
        },
      });
    } else {
      console.log('Invalid');
    }
  }

  submitSignIn() {
    if (this.mySignInFormGroup.valid) {
      this.user = this.mySignInFormGroup.value;
      console.log('User: \n ' + this.user);

      this.logService.signIn(this.user).subscribe({
        next: (data) => {
          const authToken = data.headers.get('x-auth-token');
          // console.log('x-auth-token:', authToken);
          // console.log("authToken: \n" + JSON.stringify(authToken));
          this.logInError = false;
          localStorage.setItem('access_token', authToken);
          const decoded = jwtDecode(authToken);
          console.log('Decoded token \n' + decoded);

          if (this.router.url === '/login') {
            this.router.navigate(['/']);
          } else {
            window.location.reload();
          }
          // const decodedToken = jwt_decode();
          // console.log(decodedToken);
        },
        error: (err) => {
          this.logInError = true;
          console.log(err);
        },
      });
    }
  }

  triggerFileInput(event: any) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
    console.log(fileInput.files);

    if (fileInput.files?.length) {
      const file = fileInput.files[0];
      this.image = file;
      console.log(this.image);
    }
    // console.log(event);
    // console.log(event.target.files);
  }
}
