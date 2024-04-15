import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.section.component.html',
  styleUrl: './intro.section.component.css',
})
export class IntroSectionComponent {

  ngOnInit () {
    console.log("Intro");

  }
}
