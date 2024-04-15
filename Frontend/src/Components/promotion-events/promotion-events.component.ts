import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, input } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-promotion-events',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [EventService],
  templateUrl: './promotion-events.component.html',
  styleUrl: './promotion-events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionEventsComponent implements OnInit {
  @Input() events: any;
  flag: Boolean = true;

  constructor(private evService: EventService) { }

  @ViewChild('next') myDiv!: ElementRef<HTMLElement>;

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    console.log(el);
    el.click();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.triggerFalseClick();
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
