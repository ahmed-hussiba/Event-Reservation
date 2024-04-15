import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AllEventsComponent } from '../all-events/all-events.component';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, AllEventsComponent],
  providers: [EventService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  events: any;
  twoEvents: {
    event: { _id: Number; name: string; description: string,category:string };
    imgBuffer: string;
  }[] = [];
  constructor(
    private evService: EventService
  ) {}
  ngOnInit(): void {
    this.evService.GetAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        // for (const key in this.events) {
        //   if (this.events.hasOwnProperty(key)) {
        //     console.log(`${key}: ${this.events[key]}`);
        //   }
        // }
        this.twoEvents.push(this.events['eventsWithImgs'][0]);
        this.twoEvents.push(this.events['eventsWithImgs'][1]);
        this.twoEvents.push(this.events['eventsWithImgs'][2]);

        // console.log(this.twoEvents);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkCounter(i: Number) {
    return i == 1;
  }

  GoToEvent(eventId: Number) {

  }
}
