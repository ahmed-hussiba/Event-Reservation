import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-events',
  standalone: true,
  imports: [HttpClientModule,
    CommonModule],
  providers: [EventService],
  templateUrl: './promotion-events.component.html',
  styleUrl: './promotion-events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionEventsComponent implements OnInit {
  events: any;
  flag: Boolean = true;
  constructor(private evService: EventService) { }
  ngOnInit(): void {
    this.evService.GetPromotedEvets().subscribe(
      {
        next: (data) => {
          this.events = data;
          // console.log("PROMOTED EVENTS COMP: EVSERVICE.GETPROMOTED");
          // console.log(this.events);
        },
        error: (err) => { console.log(err); }
      }
    );
  }

  toggle() {
    this.flag = false
  }


}
