import {
  Component,
  OnInit,
} from '@angular/core';
import { AdminAllEventsComponent } from '../admin-all-events/admin-all-events.component';
import { Router, RouterModule } from '@angular/router';
import { AdminShowOrdersComponent } from '../admin-show-orders/admin-show-orders.component';
import { BarchartComponent } from '../barchart/barchart.component';
import { DoughnutChartComponent } from "../doughnut-chart/doughnut-chart.component";
import { UserHeaderLinksComponent } from "../user-header-links/user-header-links.component";

@Component({
    selector: 'app-admin-home',
    standalone: true,
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.css',
    imports: [AdminAllEventsComponent, AdminShowOrdersComponent, RouterModule, BarchartComponent, DoughnutChartComponent, UserHeaderLinksComponent]
})
export class AdminHomeComponent implements OnInit  {
  constructor(private router:Router){}
  ngOnInit(): void {
  }

  logOut()
  {
    localStorage.removeItem('access_token');
    this.router.navigate(['/'])
    // window.location.reload();
  }
  
 
}
