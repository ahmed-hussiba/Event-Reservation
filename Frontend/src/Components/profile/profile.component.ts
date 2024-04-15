import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UserHeaderLinksComponent,FooterComponent],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  UserData: any = '';
  image: any;
  flag: any;
  err: any;
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
      let formData = new FormData();
      formData.set('image', this.image);
      formData.set('data', JSON.stringify(newUser));

      console.log(newUser);
      this.userService.EditProfile(formData).subscribe({
        next: (data) => {
          console.log('update successfully');
          this.flag = 1;
          console.log(data);
        },
        error: (err) => {
          console.log('err in update');
          console.log(err);
          this.flag = 2;
        },
      });
    }
  }

  triggerFileInput(event: any) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const imgId: any = document.getElementById('imgId') as HTMLInputElement;
    fileInput.click();
    console.log(fileInput.files);

    if (fileInput.files?.length) {
      var tgt = event.target || event.srcElement,
        files = tgt.files;
      const file = fileInput.files[0];
      this.image = file;
      console.log(this.image);

      if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
          imgId.src = fr.result;
        };
        fr.readAsDataURL(files[0]);
      }
    }
    // console.log(event);
    // console.log(event.target.files);
  }
}
