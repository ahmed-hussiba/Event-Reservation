import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { SharedEventsService } from '../../Services/shared-events.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-update-event',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [EventService],
  templateUrl: './admin-update-event.component.html',
  styleUrl: './admin-update-event.component.css',
})
export class AdminUpdateEventComponent implements OnInit {
  id: any;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}
  event: any;
  img: any;
  ticketsDetails: {}[] = [];
  addForm: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.eventService.GetEventById(this.id!).subscribe({
      next: (data) => {
        console.log(data);

        this.event = data;
        this.img = this.event.EventwithImg.imgBuffer;
        this.event = this.event.EventwithImg.event;
        console.log(this.event);
        console.log(this.img);

        this.addForm = new FormGroup({
          imageURl: new FormControl(`${this.img}`, [Validators.required]),
          name: new FormControl(`${this.event.name}`, [
            Validators.required,
            Validators.minLength(3),
          ]),
          location: new FormControl(`${this.event.location}`, [
            Validators.required,
          ]),
          date: new FormControl(`${this.event.date}`, [Validators.required]),
          category: new FormControl(`${this.event.category}`, [
            Validators.required,
          ]),
          description: new FormControl(`${this.event.description}`, [
            Validators.required,
          ]),
          organizer: new FormControl(`${this.event.organizer}`, [
            Validators.required,
          ]),
          performer: new FormControl(`${this.event.performer}`, [
            Validators.required,
          ]),
          promotion: new FormControl(`${this.event.promotion}`, []),
          PriceS: new FormControl(`${this.event.ticketsAvailable[0].price}`, [
            Validators.required,
          ]),
          PriceG: new FormControl(`${this.event.ticketsAvailable[1].price}`, [
            Validators.required,
          ]),
          PriceP: new FormControl(`${this.event.ticketsAvailable[2].price}`, [
            Validators.required,
          ]),
          QuantityS: new FormControl(
            `${this.event.ticketsAvailable[0].quantity}`,
            [Validators.required]
          ),
          QuantityG: new FormControl(
            `${this.event.ticketsAvailable[1].quantity}`,
            [Validators.required]
          ),
          QuantityP: new FormControl(
            `${this.event.ticketsAvailable[2].quantity}`,
            [Validators.required]
          ),
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  Update() {
    if (this.addForm) {
      console.log(this.addForm.controls['category'].value);

      if (this.addForm.valid) {
        this.event = this.addForm.value;

        // this.eventService.UpdateEvent( this.event);
      } else {
        console.log('Errrrrrrrror');
      }
    }
  }
  triggerFileInput(event: any) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
    console.log(`event = ${event}`);

    console.log(fileInput.files);

    if (fileInput.files?.length) {
      const file = fileInput.files[0];
      // this.image = file;
      console.log(`file=${file}`);

      // console.log(`img in fun = ${this.image}`);
    }
  }
}
