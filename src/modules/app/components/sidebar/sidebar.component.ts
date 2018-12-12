import { Component, OnInit, ElementRef } from '@angular/core';
import { ToggleSidenavService } from './../../services/toggle-sidenav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private componentHeight: number;
  private hide: boolean;
  private width: number;
  private height: number;
  private sidebarWidth: string;
  private renderedWidth: string;
  private hideWidth: string;
  private hideHeight: string;
  private hideLeft: string;
  private sidebarLeft: string;
  private lineHeight: string;
  private lineLeft: string;


  constructor(
    private toggleSidenav: ToggleSidenavService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.setupVariables();
    this.setupToggleButton();
  }

  private setupVariables() {

    // Get the value of wether sidebar is visible
    this.hide = !this.toggleSidenav.visible;

    // Get the width of sidebar based on it's content
    this.width = document
      .getElementsByClassName('sidebar')[0]
      .getBoundingClientRect().width;

    // Get the height of sidebar
    this.height = document
      .getElementsByClassName('sidebar')[0]
      .getBoundingClientRect().height;

    this.componentHeight = this.el.nativeElement.offsetHeight;
    this.sidebarWidth = `${this.width}px`;
    this.renderedWidth = `${this.width + 20}px`;
    this.hideWidth = `${this.width + 20}px`;
    this.hideHeight = `${this.componentHeight + 100}px`;
    this.hideLeft = `${-(this.width + 35)}px`;
    this.lineHeight = `${this.componentHeight + 20}px`;
    this.lineLeft = `${this.width}px`;
  }

  private setupToggleButton = () => {

    // Provide function to call when hanburger button clicked
    this.toggleSidenav.subscribe(() => {
      this.hide = !this.toggleSidenav.visible;

      if (this.hide) {
        this.sidebarLeft = `${-(this.width + 30)}px`;
        this.lineLeft = `${-(this.width + 30)}px`;
        this.renderedWidth = `0`;

      } else {
        this.sidebarLeft = `0`;
        this.renderedWidth = `${this.width + 20}px`;
        this.lineLeft = `${this.width}px`;
      }
    });
  }

}
