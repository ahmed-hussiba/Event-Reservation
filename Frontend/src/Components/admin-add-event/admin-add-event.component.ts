import { Component } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-event',
  standalone: true,
  imports: [
    HttpClientModule,
     ReactiveFormsModule,
     CommonModule,
    FormsModule,],
  providers: [EventService],
  templateUrl: './admin-add-event.component.html',
  styleUrl: './admin-add-event.component.css',
})
export class AdminAddEventComponent {
  constructor(private EvService: EventService) {}
  Ev: any;
  image: any;
  ticketsDetails: {}[] = [];
  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    location: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    organizer: new FormControl('', [Validators.required]),
    performer: new FormControl('', [Validators.required]),
    promotion: new FormControl('', []),
    PriceS: new FormControl('', [Validators.required]),
    PriceG: new FormControl('', [Validators.required]),
    PriceP: new FormControl('', [Validators.required]),
    QuantityS: new FormControl('', [Validators.required]),
    QuantityG: new FormControl('', [Validators.required]),
    QuantityP: new FormControl('', [Validators.required]),
    imageURl: new FormControl('', [Validators.required]),
  });

  Add() {
    if (this.addForm.valid) {
      this.Ev = this.addForm.value;
      delete this.Ev.PriceG;
      delete this.Ev.PriceS;
      delete this.Ev.PriceP;
      delete this.Ev.QuantityP;
      delete this.Ev.QuantityG;
      delete this.Ev.QuantityS;
      // delete this.Ev.Image;

      this.Ev._id = 27;
      this.ticketsDetails.push({
        level: 'silver',
        price: this.addForm.controls['PriceS'].value,
        quantity: this.addForm.controls['QuantityS'].value,
      });

      this.ticketsDetails.push({
        level: 'golden',
        price: this.addForm.controls['PriceG'].value,
        quantity: this.addForm.controls['QuantityG'].value,
      });

      this.ticketsDetails.push({
        level: 'platinum',
        price: this.addForm.controls['PriceP'].value,
        quantity: this.addForm.controls['QuantityP'].value,
      });
      this.Ev['ticketsAvailable'] = this.ticketsDetails;
      console.log(this.Ev);
      let formData = new FormData();
      formData.set('image', this.image);
      // console.log(this.Ev.Image);

      formData.set('data', JSON.stringify(this.Ev));
      this.EvService.AddEvent(formData).subscribe({
        next: (data) => {
          console.log(data);
          alert("added successfully");
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('invalid data');
    }
  }
  triggerFileInput(event: any) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
    console.log(`event = ${event}`);

    console.log(fileInput.files);

    if (fileInput.files?.length) {
      const file = fileInput.files[0];
      this.image = file;
      console.log(`file=${file}`);

      console.log(`img in fun = ${this.image}`);
    }
  }
}
