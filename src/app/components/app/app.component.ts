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
  sidenavContent: Object;
  sidenavHide: boolean;
  sidenavRenderWidth: boolean;
  sidenavUseTransition: boolean;

  constructor(sidenavContentService: SidebarContentService) {
    this.sidenavContent = sidenavContentService.content;
    this.setCurrentMedia();
  }

  onDesktop() {
    this.headerShowOnScrollUp = false;
    this.sidenavHide = false;
    this.sidenavRenderWidth = true;
    this.sidenavUseTransition = false;
  }

  onTablet() {
    this.headerShowOnScrollUp = false;
    this.sidenavHide = true;
    this.sidenavRenderWidth = false;
    this.sidenavUseTransition = false;
  }

  onPhone() {
    this.headerShowOnScrollUp = true;
    this.sidenavHide = true;
    this.sidenavRenderWidth = false;
    this.sidenavUseTransition = false;
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
    this.sidenavHide = !this.sidenavHide;
    this.sidenavUseTransition = true;
  }
}
