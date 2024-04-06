import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedEventsService } from '../../Services/shared-events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [EventService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  events: any;
  twoEvents: {
    event: { _id: Number; name: string; description: string };
    imgBuffer: string;
  }[] = [];
  constructor(
    private evService: EventService,
    private sharedService: SharedEventsService
  ) {}
  ngOnInit(): void {
    this.evService.GetAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.twoEvents.push(this.events['eventsWithImgs'][0]);
        this.twoEvents.push(this.events['eventsWithImgs'][1]);
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
    this.sharedService.setData(eventId);
  }
}
