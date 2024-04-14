import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  input,
} from '@angular/core';

@Component({
  selector: 'app-promotion-events',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [EventService],
  templateUrl: './promotion-events.component.html',
  styleUrl: './promotion-events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionEventsComponent implements OnInit {
  @Input()
  events: any;
  flag: Boolean = true;
  constructor(private evService: EventService) {}
  ngOnInit(): void {
    console.log(this.events);
    // this.setFlag();
  }

  toggle() {
    console.log(this.flag);

    this.flag = false;
  }
  // setFlag() {
  //   setTimeout(() => {
  //     this.flag = true;
  //   }, 4000);
  // }
}
