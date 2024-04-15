import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers:[EventService],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css'
})
export class DoughnutChartComponent implements AfterViewInit, OnInit {
  constructor(private EventService: EventService){}
  allEvents: any;
  sportCounter: number = 0;
  theaterCounter: number = 0;
  entertainmentCounter: number = 0;
  artCounter: number = 0;
  concertCounter: number = 0;
  ngOnInit(): void {
    this.EventService.GetAllEvents().subscribe({
      next: (data) => {
        // console.log(data);
        this.allEvents = data;
        this.allEvents = this.allEvents.eventsWithImgs;
        this.CountCategory();
        this.createDoughnutChart();
      },
      error: (err) => {
        console.log(err);
      },
    });  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  CountCategory() {
    for (var item of this.allEvents) {
      switch (item.event.category) {
        case 'Sport':
          this.sportCounter++;
          break;
        case 'Comedy':
          this.entertainmentCounter++;
          break;
        case 'Theater':
          this.theaterCounter++;
          break;
        case 'Concert':
          this.concertCounter++;
          break;
        case 'Arts':
          this.artCounter++;
          break;
      }
    }
  }
  @ViewChild('doughnutChartCanvas') private doughnutChartCanvas!: ElementRef;
  private doughnutChart: any;
  createDoughnutChart() {
    const ctx = this.doughnutChartCanvas.nativeElement.getContext('2d');
    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Sport', 'Entertainment', 'Theater', 'Concert', 'Arts'],
        datasets: [
          {
            label: '-->Categories',
            data: [
              this.sportCounter,
              this.entertainmentCounter,
              this.theaterCounter,
              this.concertCounter,
              this.artCounter,
            ],
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
