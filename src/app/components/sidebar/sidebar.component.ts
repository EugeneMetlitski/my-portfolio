import { Component, OnInit, ElementRef } from '@angular/core';
import { SidebarService, State } from './../../services/sidebar.service';
import { ToggleButtonService } from './../../services/toggle-button.service';



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
    private sidebarService: SidebarService,
    private toggleButton: ToggleButtonService,
    private el: ElementRef
  ) {
    this.subscribeToStateChange();
  }

  ngOnInit() {
    this.setContent();
    this.setupVariables();
    this.setupToggleButton();
  }


  private subscribeToStateChange = () => {

    this.sidebarService.subToStateChange(State.InsideDocumentFlow, () => {
      console.log(`InsideDocumentFlow`);
      this.setW(`${this.width + 20}px`);
      console.log(this.renderedWidth);

      // document.getElementsByClassName('rendered-width')[0].style.width = `${this.width + 20}px`;
    });

    this.sidebarService.subToStateChange(State.OutsideDocumentFlow, () => {
      console.log(`OutsideDocumentFlow`);
      this.setW(`0`);
      console.log(this.renderedWidth);

      // document.getElementsByClassName('rendered-width')[0].style.width = `0`;
    });
  }

  private setContent() {
    const content = this.sidebarService.getContent();
  }

  private setupVariables() {

    // Get the value of wether sidebar is visible
    this.hide = !this.toggleButton.visible;

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

  private setW(w) {
    this.renderedWidth = w;
  }

  private setupToggleButton = () => {

    // Provide function to call when hanburger button clicked
    this.toggleButton.subscribe(() => {
      this.hide = !this.toggleButton.visible;

      if (this.hide) {
        // this.sidebarLeft = `${-(this.width + 30)}px`;
        // this.lineLeft = `${-(this.width + 30)}px`;
        this.renderedWidth = `0`;

      } else {
        // this.sidebarLeft = `0`;
        // this.lineLeft = `${this.width}px`;
        this.renderedWidth = `${this.width + 20}px`;
      }
    });
  }

}
