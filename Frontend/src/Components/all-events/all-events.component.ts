import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedEventsService } from '../../Services/shared-events.service';
import { FormsModule } from '@angular/forms';
import { UserHeaderLinksComponent } from '../user-header-links/user-header-links.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    UserHeaderLinksComponent,
    FooterComponent
  ],
  providers:[EventService],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit {
constructor(private evService:EventService,
  private activatedRoute: ActivatedRoute
){}
allEv:any;

searchData:{ event: { name: string } }[] =[];
flag:boolean=true;
ngOnInit(): void {
  let categoryName = this.activatedRoute.snapshot.paramMap.get("name")
  if(!categoryName)
    {
      this.evService.GetAllEvents().subscribe({
        next:(data)=>{
          this.allEv=data;
          this.allEv=this.allEv.eventsWithImgs;
          this.searchData=this.allEv
        },
        error:(err)=>{console.log(err);
        }
      })
    }
    else{
      this.evService.GetEventByCategoryName(categoryName).subscribe({
            next:(data)=>{
              console.log(data);
              this.allEv = data
              this.allEv=this.allEv.eventsWithImgs;
              this.searchData=this.allEv
            },
            error:(err)=>{
              console.log(err);
              
            }
          });
    }
 
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
    // this.dataService.sendData(eventId);
  }
  onInputChange(value: string) {
    this.EvName = value;
    console.log(this.EvName);
    this.flag=false;
    this.SearchEvent(); // Update EvName with the input value
  }
}
