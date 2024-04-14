import { Component, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedEventsService } from '../../Services/shared-events.service';
import { FormsModule } from '@angular/forms';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    UserHeaderLinksComponent],
  providers:[EventService],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit {
constructor(private evService:EventService, private sharedService:SharedEventsService){}
allEv:any;
searchData:{ event: { name: string } }[] =[];
flag:boolean=true;
ngOnInit(): void {
  this.evService.GetAllEvents().subscribe({
    next:(data)=>{
      this.allEv=data;
      this.allEv=this.allEv.eventsWithImgs;
      this.searchData=this.allEv
      console.log(this.searchData+"seeeeearchdataaa");
      
      console.log(this.allEv);
    },
    error:(err)=>{console.log(err);
    }
  })
}
EvName:string="";
filteredItems:any[]=[];
  SearchEvent(){
    // console.log(this.EvName);
    this.filteredItems=this.searchData.filter(item  =>
      item.event.name.toLowerCase().includes(this.EvName.toLowerCase())

    );
      console.log(this.filteredItems+"filtereeeeeeddataaa");
     

  }
  GoToEvent(eventId: Number) {
    this.sharedService.setData(eventId);
  }
  onInputChange(value: string) {
    this.EvName = value;
    console.log(this.EvName);
    this.flag=false;
    this.SearchEvent(); // Update EvName with the input value
  }
}
