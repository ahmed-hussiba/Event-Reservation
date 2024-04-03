import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HttpClientModule,
    CommonModule
  ],
  providers:[EventService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
events:any;
twoEvents:{event:{name:string,description:string},imgBuffer:string}[]=[];
constructor (private evService:EventService){}
  ngOnInit(): void {
    this.evService.GetAllEvents().subscribe(
      {
        next:(data)=>{
          this.events=data;
          this.twoEvents.push(this.events["eventsWithImgs"][0]);
          this.twoEvents.push(this.events["eventsWithImgs"][1]);
          console.log(this.twoEvents);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
  }

  checkCounter(i:Number)
  {
    return i==1;
  }

}
