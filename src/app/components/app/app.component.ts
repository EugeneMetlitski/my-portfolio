import { ControlService } from './../control.service';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private control: ControlService) { }

  // Run after all other components have been rendered
  ngAfterViewInit() {
    // Run the file that controls the app
    this.control.init();
  }
}
