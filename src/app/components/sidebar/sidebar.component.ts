import { Component, OnInit, ElementRef } from '@angular/core';
import { ToggleButtonService } from './../../services/toggle-button.service';
import { WindowResize } from 'src/utils/widnow-resize';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private w: number;     // Width of sidenav based on content
  private width: string; // Rendered width
  private left: string;  // Background element's left style
  private windowResize: WindowResize;
  private tablet = 800;
  private phone  = 600;


  constructor(
    private el: ElementRef,
    private toggleButton: ToggleButtonService
  ) { }

  ngOnInit() {
    // this.setContent();
    this.setupVariables();
    this.setupToggleButton();
    this.responsiveSetup();
  }


  private setContent() { }

  private setupVariables() {
    // Get the width of sidebar based on it's content
    this.w = document
      .getElementsByClassName('sidebar')[0]
      .getBoundingClientRect().width;
  }

  private setupToggleButton = () => {

    // Provide function to call when hanburger button clicked
    this.toggleButton.subscribe(() => {
      const hide = !this.toggleButton.visible;
      console.log(hide);

      if (hide) {
        this.width = `0`;
        this.left = `-${this.w + 40}px`;
      } else {
        this.width = `${this.w + 20}px`;
        this.left = `0`;
      }
    });
  }

  private responsiveSetup = () => {
    this.windowResize = new WindowResize([this.tablet, this.phone]);

    const onDesktop = () => {
      this.windowResize.assignFunction(this.tablet, false, () => {
        this.toggleButton.visible = true;
      });
    };

    const onTablet = () => {
      this.windowResize.assignFunction(this.tablet, true, () => {
        this.toggleButton.visible = false;
      });
    };

    const onPhone = () => {
      this.windowResize.assignFunction(this.phone, true, () => {
        console.log(`Phone`);
      });
    };

    onDesktop();
    onTablet();
    onPhone();
  }

}
