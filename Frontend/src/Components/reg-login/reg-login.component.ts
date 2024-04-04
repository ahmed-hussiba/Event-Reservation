import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../Services/login.services';
import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { routes } from '../../app/app.routes';

@Component({
  selector: 'app-reg-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [LoginService],
  templateUrl: './reg-login.component.html',
  styleUrl: './reg-login.component.css',
})
export class RegLoginComponent {
  user: any;
  responseData: any;
  responseHeaders: any;
  constructor(private logService: LoginService, private route: Router) {}
  mySignInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$'),
      Validators.required,
    ]),
  });

  get emailIsValid() {
    return this.mySignInFormGroup.controls['email'].valid;
  }
  get passwordIsValid() {
    return this.mySignInFormGroup.controls['password'].valid;
  }

  submitSignIn() {
    if (this.mySignInFormGroup.valid) {
      this.user = this.mySignInFormGroup.value;
      console.log(this.user);

      this.logService.signIn(this.user).subscribe({
        next: (data) => {
          const authToken = data.headers.get('x-auth-token');
          // console.log('x-auth-token:', authToken);
          console.log(JSON.stringify(authToken));

          localStorage.setItem('access_token', JSON.stringify(authToken));

          // console.log(decoded);
          window.location.reload();

          // this.route.navigate(['/']);
          // const decodedToken = jwt_decode();
          // console.log(decodedToken);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
