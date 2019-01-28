import { BioComponent } from './content/bio/bio.component';
import { ProjectsComponent } from './content/projects/projects.component';
import { PhoneMediaControler } from '../services/phone-media-controler';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

export enum Media { phone = 600, tablet = 800 }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  media: Media;
  private phoneMediaController = new PhoneMediaControler();

  headerTitle: String;
  btnSidenav_Render: boolean;
  sidenavRender: boolean;
  sidenavHide: boolean;
  sidenavRenderWidth: boolean;
  sidenavUseTransition: boolean;
  sidenavContent;

  constructor(private router: Router) {
    this.sidenavRender = true;
    if (this.router.url === '/' || this.router.url === '/bio') {
      this.headerTitle = 'Bio';
      this.btnSidenav_Render = true;
      this.sidenavContent = sidenavContent_Bio;
    } else if (this.router.url === '/projects') {
      this.headerTitle = 'Projects';
      this.btnSidenav_Render = true;
      this.sidenavContent = sidenavContent_Projects;
    } else {
      this.btnSidenav_Render = false;
      this.sidenavRender = false;

      if (this.router.url === '/contact') {
        this.headerTitle = 'Contact';
      } else if (this.router.url === '/resume') {
        this.headerTitle = 'Blog';
      }
    }
    this.setCurrentMedia();

    // router.events.forEach((event) => {
    //   if (event instanceof NavigationStart) {
    //     if (event.url === '/bio') {
    //       this.sidenavRender = true;
    //       this.sidenavContent = sidenavContent_Bio;
    //       this.setCurrentMedia();
    //     } else if (event.url === '/projects') {
    //       this.sidenavRender = true;
    //       this.sidenavContent = sidenavContent_Projects;
    //       this.setCurrentMedia();
    //     } else {
    //       this.sidenavRender = false;
    //       this.setCurrentMedia();
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {
    this.phoneMediaController.init();
  }

  onDesktop() {
    this.media = undefined;

    // If sidenev should be rendered based on the current page
    if (this.sidenavRender) {
      this.sidenavHide = false;
      this.sidenavRenderWidth = true;
      this.sidenavUseTransition = false;
    } else {
      this.sidenavHide = true;
      this.sidenavRenderWidth = false;
      this.sidenavUseTransition = false;
    }
  }

  onTablet() {
    this.media = Media.tablet;
    this.sidenavHide = true;
    this.sidenavRenderWidth = false;
    this.sidenavUseTransition = false;
    this.phoneMediaController.deactivate();
  }

  onPhone() {
    this.media = Media.phone;
    this.sidenavHide = true;
    this.sidenavRenderWidth = false;
    this.sidenavUseTransition = false;
    this.phoneMediaController.activate();
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

  private onRouterActivate(componentRef) {
    this.sidenavRender = true;
    if (this.router.url === '/' || this.router.url === '/bio') {
      this.headerTitle = 'Bio';
      this.btnSidenav_Render = true;
      this.sidenavContent = sidenavContent_Bio;
    } else if (this.router.url === '/projects') {
      this.headerTitle = 'Projects';
      this.btnSidenav_Render = true;
      this.sidenavContent = sidenavContent_Projects;
    } else {
      this.btnSidenav_Render = false;
      this.sidenavRender = false;

      if (this.router.url === '/contact') {
        this.headerTitle = 'Contact';
      } else if (this.router.url === '/resume') {
        this.headerTitle = 'Blog';
      }
    }
    this.setCurrentMedia();

    if (componentRef instanceof ProjectsComponent) {
      this.sidenavContent.sections[0].links[0].element = componentRef.portfolio_site;
      this.sidenavContent.sections[0].links[1].element = componentRef.workout_app;
    } else if (componentRef instanceof BioComponent) {
      this.sidenavContent.sections[0].links[0].element = componentRef.introduction;
      this.sidenavContent.sections[0].links[1].element = componentRef.skills;
      this.sidenavContent.sections[0].links[2].element = componentRef.education;
    }
  }

  private onBtnSidenavClicked() {
    this.sidenavHide = !this.sidenavHide;
    this.sidenavUseTransition = true;
  }
}



const sidenavContent_Bio = {
  title: 'Navigation',
  width: 166.171875,
  sections: [
    {
      title: ``,
      links: [
        { txt: `Introduction`,  element: undefined, isActive: false },
        { txt: `Skills`, element: undefined, isActive: false },
        { txt: `Education`, element: undefined, isActive: false },
      ]
    },
  ]
};

const sidenavContent_Projects = {
  title: 'My Apps',
  width: 173.671875,
  sections: [
    {
      title: `Personal`,
      links: [
        { txt: `Portfolio Site`,  element: undefined, isActive: false },
        { txt: `Workout App`, element: undefined, isActive: false },
      ]
    },
  ]
};
