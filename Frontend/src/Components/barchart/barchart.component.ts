import { Component } from '@angular/core';
import { OrderServiceService } from '../../Services/order.service.service';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [RouterModule],
  providers: [OrderServiceService],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css',
})
export class BarchartComponent implements AfterViewInit, OnInit {
  constructor(private OrderService: OrderServiceService) {}
  allOrders: any;
  maxOrders:any[]=[]
  arr:any[]=[];

  ngOnInit(): void {
   this.OrderService.getAllOrders().subscribe({
    next:(value)=> {
        console.log(value);
        this.allOrders=value;
        this.allOrders=this.allOrders.data;
        this.getMaxOrders();
        console.log(this.maxOrders);
        for (let item of this.maxOrders) {
          this.arr.push(item.countOfTickets)
        }
    },
    error:(err)=>{console.log(err);
    }
   })
  }

  getMaxOrders(): void {
    // Sort the allOrders array based on countOfTickets property in descending order
    this.allOrders.sort((a: { countOfTickets: number; }, b: { countOfTickets: number; }) => b.countOfTickets - a.countOfTickets);
    
    // Extract the first 5 items (max orders) from the sorted array
    this.maxOrders = this.allOrders.slice(0, 5);
  }
  ngAfterViewInit(): void {
    this.createBarChart();
    
  }
  @ViewChild('barChartCanvas') private barChartCanvas!: ElementRef;
  private barChart: any;
  createBarChart() {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Order1', 'Order2', 'Order3', 'Order4', 'Order5'],
        datasets: [
          {
            label: '--> Orders with highest number of tickets',
            data: this.arr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
