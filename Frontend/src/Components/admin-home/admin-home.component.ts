import { Component } from '@angular/core';
import { AdminAllEventsComponent } from '../admin-all-events/admin-all-events.component';
import { RouterModule } from '@angular/router';
import { SharedEventsService } from '../../Services/shared-events.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterModule,AdminAllEventsComponent,],
  
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
