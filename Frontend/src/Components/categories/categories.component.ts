import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule
  ],
  providers:[EventService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  constructor(private evService:EventService){}
  // getCategory(name:string){
  //   this.evService.GetEventByCategoryName(name).subscribe({
  //     next:(data)=>{
  //       console.log(data);
  //     },
  //     error:(err)=>{
  //       console.log(err);
        
  //     }
  //   });
  // }
}
