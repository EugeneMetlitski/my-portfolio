import { Component, OnInit } from '@angular/core';
import { State } from './services/state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  //#region variables

  private content: object;
  private w: number; // Width of sidebar based on content
  private width;     // The element for rendering width
  private left;      // Background element slides when hidden

  //#endregion
  //#region init

  constructor(private state: State) { }

  ngOnInit() {
    // this.setContent();
    this.setupVariables();
    this.setupSateService();
  }

  //#endregion
  //#region getters & setters

  get title() {
    return `Projects`;
  }

  //#endregion
  //#region private-functions

  private setContent() { }

  private setupVariables() {
    // Get the width of sidebar based on it's content
    this.w = document
      .getElementsByClassName('sidebar')[0]
      .getBoundingClientRect().width;

    this.width = document.getElementById('width');
    this.left = document.getElementById('background');
  }

  private setupSateService = () => {

    // Provide function to call when hanburger button clicked
    this.state.subscribe((renderWidth: boolean) => {
      const hide = !this.state.visible;

      if (hide) {
        this.width.style.width = `0`;
        this.left.style.left = `-${this.w + 40}px`;
      } else {
        (renderWidth) ?
          this.width.style.width = `${this.w + 20}px` :
          this.width.style.width = `0`;
        this.left.style.left = `0`;
      }
    });
  }

  //#endregion
}
