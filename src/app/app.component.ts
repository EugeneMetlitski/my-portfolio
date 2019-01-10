import { Component } from '@angular/core';
import { SidebarContentService } from 'src/services/sidebar-content.service';

export enum Media { phone = 600, tablet = 800 }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  media: Media;

  sidenavContent: Object;
  sidenavHide: boolean;
  sidenavRenderWidth: boolean;
  sidenavUseTransition: boolean;
  btnHeaderDown = true;

  constructor(sidenavContentService: SidebarContentService) {
    this.sidenavContent = sidenavContentService.content;
    this.setCurrentMedia();
  }

  onDesktop() {
    this.media = undefined;
    this.sidenavHide = false;
    this.sidenavRenderWidth = true;
    this.sidenavUseTransition = false;
  }

  onTablet() {
    this.media = Media.tablet;
    this.sidenavHide = true;
    this.sidenavRenderWidth = false;
    this.sidenavUseTransition = false;
  }

  onPhone() {
    this.media = Media.phone;
    this.sidenavHide = true;
    this.sidenavRenderWidth = false;
    this.sidenavUseTransition = false;
  }

  /**
   * At the start of the app, call the appropriate
   * media function depending on window width.
   */
  private setCurrentMedia() {
    if (window.innerWidth > Media.tablet) {
      this.onDesktop();
    } else if (window.innerWidth > Media.phone) {
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
    if (this.media === Media.tablet) {
      // If media changed from tablet to desktop
      if (event.target.innerWidth > Media.tablet) {
        this.onDesktop();
      // If media changed from tablet to phone
      } else if (event.target.innerWidth <= Media.phone) {
        this.onPhone();
      }
    } else if (this.media === Media.phone) {
      // If media changed from phone to tablet
      if (event.target.innerWidth > Media.phone) {
        this.onTablet();
      }
    } else {
      // If media changed from desktop to tablet
      if (event.target.innerWidth <= Media.tablet) {
        this.onTablet();
      }
    }
  }

  private onBtnSidenavClicked() {
    this.sidenavHide = !this.sidenavHide;
    this.sidenavUseTransition = true;
  }
}
