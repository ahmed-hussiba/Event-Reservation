import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  UserData: any = '';
  mySignUpFormGroup: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.GetUserByID().subscribe({
      next: (data) => {
        console.log(data);

        this.UserData = data;
        this.UserData = this.UserData.resObj;

        this.mySignUpFormGroup = new FormGroup({
          email: new FormControl(`${this.UserData.user.email}`, [
            Validators.email,
            Validators.required,
          ]),
          username: new FormControl(`${this.UserData.user.username}`, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern('^[a-zA-Z0-9_.]+$'),
          ]),
          // password: new FormControl('', [
          //   Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).{8,}$'),
          //   Validators.required,
          // ]),
          country: new FormControl(`${this.UserData.user.country}`, [
            Validators.required,
          ]),
          city: new FormControl(`${this.UserData.user.city}`, [
            Validators.required,
          ]),
          // fileUpload: new FormControl('', [Validators.required]), // Add the file validator here
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get isValidRegisterCountry() {
    return this.mySignUpFormGroup.controls['country'].valid;
  }
  get isValidRegisterCity() {
    return this.mySignUpFormGroup.controls['city'].valid;
  }

  get isValidRegisterUserName() {
    return this.mySignUpFormGroup.controls['username'].valid;
  }
  get isValidRegisterEmail() {
    return this.mySignUpFormGroup.controls['email'].valid;
  }
  saveChanges() {
    // console.log(this.mySignUpFormGroup.controls['email'].value);
    if (this.mySignUpFormGroup.valid) {
      let newUser = this.mySignUpFormGroup.value;

      console.log(newUser);
      this.userService.EditProfile(newUser).subscribe({
        next: (data) => {
          console.log('update successfully');

          console.log(data);
        },
        error: (err) => {
          console.log('err in update');
          console.log(err);
        },
      });
    }
  }
}
