import { Component } from '@angular/core';
import { SidebarContentService } from './../../services/sidebar-content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tablet = 800;
  phone = 600;
  currentMedia: number;

  headerShowOnScrollUp: boolean;

  constructor(private sbContent: SidebarContentService) {
    this.setCurrentMedia();
  }

  onDesktop() {
    console.log(`Desktop`);
    this.headerShowOnScrollUp = false;
  }

  onTablet() {
    console.log(`Tablet`);
    this.headerShowOnScrollUp = false;
  }

  onPhone() {
    console.log(`Phone`);
    this.headerShowOnScrollUp = true;
  }

  /**
   * At the start of the app, call the appropriate
   * media function depending on window width.
   */
  private setCurrentMedia() {
    if (window.innerWidth > this.tablet) {
      this.onDesktop();
    } else if (window.innerWidth > this.phone) {
      this.onTablet();
    } else {
      this.onPhone();
    }
  }

  /**
   * This function checks if window resized to another media.
   *
   * @param event that is raised on window resize
   */
  private onWindowResize(event) {
    if (this.currentMedia === this.tablet) {
      // If media changed from tablet to desktop
      if (event.target.innerWidth > this.tablet) {
        this.currentMedia = undefined;
        this.onDesktop();
      // If media changed from tablet to phone
      } else if (event.target.innerWidth <= this.phone) {
        this.currentMedia = this.phone;
        this.onPhone();
      }
    } else if (this.currentMedia === this.phone) {
      // If media changed from phone to tablet
      if (event.target.innerWidth > this.phone) {
        this.currentMedia = this.tablet;
        this.onTablet();
      }
    } else {
      // If media changed from desktop to tablet
      if (event.target.innerWidth <= this.tablet) {
        this.currentMedia = this.tablet;
        this.onTablet();
      }
    }
  }

  private onBtnSidebarClicked() {
    console.log(`sidebar button clicked`);
  }
}
