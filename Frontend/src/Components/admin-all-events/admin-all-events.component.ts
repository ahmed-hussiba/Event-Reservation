import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminAddEventComponent } from '../admin-add-event/admin-add-event.component';
import { AdminUpdateEventComponent } from '../admin-update-event/admin-update-event.component';

@Component({
  selector: 'app-admin-all-events',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    AdminAddEventComponent,
    AdminUpdateEventComponent,
  ],
  providers: [EventService],
  templateUrl: './admin-all-events.component.html',
  styleUrl: './admin-all-events.component.css',
})
export class AdminAllEventsComponent implements OnInit {
  constructor(private evService: EventService) {}
  allEv: any;
  searchData: { event: { name: string } }[] = [];
  flag: boolean = true;
  ngOnInit(): void {
    this.evService.GetAllEvents().subscribe({
      next: (data) => {
        this.allEv = data;
        this.allEv = this.allEv.eventsWithImgs;
        this.searchData = this.allEv;
        console.log(this.searchData + 'seeeeearchdataaa');

        console.log(this.allEv);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  EvName: string = '';
  filteredItems: any[] = [];
  SearchEvent() {
    // console.log(this.EvName);
    this.filteredItems = this.searchData.filter((item) =>
      item.event.name.toLowerCase().includes(this.EvName.toLowerCase())
    );
    console.log(this.filteredItems + 'filtereeeeeeddataaa');
  }
  GoToEvent(eventId: number) {
    
    console.log('Entered Go To Eventtttttttt');
  }
  onInputChange(value: string) {
    this.EvName = value;
    console.log(this.EvName);
    this.flag = false;
    this.SearchEvent(); // Update EvName with the input value
  }
  Delete(id:any) {
    this.evService.DeleteEvent(id).subscribe({
      next:(data)=>{console.log(data);
      },
      error:(err)=>{console.log(err);
      }
    });
  }
}
