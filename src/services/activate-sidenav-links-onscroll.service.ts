import { Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

/**
 * This service activates an appropriate link on the sidenav
 * based on scrollY position.
 */
@Injectable({
  providedIn: 'root'
})
export class ActivateSidenavLinksOnscrollService {

  MEDIA_TABLET = 800;
  MEDIA_PHONE  = 600;

  /** Is the component that uses this service rendered */
  private isServiceActive = false;
  /** Scroll is active when scrollY is below the first element */
  private isOnScrollActive = false;
  private callback: Function;
  private triggers: Trigger[] = [];
  private activeLinks: boolean[] = [];
  // Variables that are used inside onScroll function
  private isPointFound: boolean;
  private offset: number;

  constructor(private router: Router) {
    window.addEventListener('scroll', this.onScroll);
  }

  private onScroll = () => {

    // If currently rendered component doesn't need this service, return
    if (!this.isServiceActive) { return; }

    // Setup variables that will be used later in this function
    this.isPointFound = false;
    // Set scroll offset based on media
    if (window.innerWidth > this.MEDIA_TABLET) { // On Desktop
      this.offset = 130;
    } else if (window.innerWidth <= this.MEDIA_PHONE) { // On Phone
      this.offset = 300;
    } else { // On Tablet
      this.offset = 140;
    }

    // If below first point
    if ( window.scrollY > ( this.triggers[0].offsetTop() + this.offset) ) {

      // Indicate the scroll below first point code has already run
      this.isOnScrollActive = true;

      // For each point (from second point on)
      for (let i = 1; i < this.triggers.length; i++) {

        // If scrollY is bellow point 2 (or 3, 4 etc.)
        if ( window.scrollY < (this.triggers[i].offsetTop() + this.offset) ) {

          if (this.activeLinks[i - 1]) { return; }
          this.isPointFound = true;

          // Set only current link to true all other links to false
          for (let j = 0; j < this.activeLinks.length; j++) {
            this.activeLinks[j] = (j === i - 1) ? true : false;
          }
          // console.log(this.activeLinks);
          this.callback(this.activeLinks);
          break;
        }
      }

      // If point wasn't found in the loop, it means the last point is active
      if (!this.isPointFound) {

        if (this.activeLinks[this.activeLinks.length - 1]) { return; }

        // Set only current link to true all other links to false
        for (let j = 0; j < this.activeLinks.length; j++) {
          this.activeLinks[j] = (j === this.activeLinks.length - 1) ? true : false;
        }
        this.callback(this.activeLinks);
      }

    // If above the first point
    } else {

      // If below code has already been executed, no need to execute it again
      if (!this.isOnScrollActive) { return; }
      // Indicate the scroll above first point code has already run
      this.isOnScrollActive = false;

      // Set every link to false
      for (let j = 0; j < this.activeLinks.length; j++) {
        this.activeLinks[j] = false;
      }
      this.callback(this.activeLinks);
    }
  }

  componentInit(componentId: String, offsetTop: Function[]) {

    this.isServiceActive = true; // Activate onScroll function

    for (let i = 0; i < offsetTop.length; i++) {
      this.activeLinks.push(false);
      this.triggers.push({
        active: false,
        offsetTop: offsetTop[i]
      });
    }

    this.callback(this.activeLinks);
  }

  componentDestroyed(componentId: String) {
    this.isServiceActive = false; // Deactivate onScroll function
    this.triggers = [];
    this.activeLinks = [];
  }

  subscribe(callback: Function) {
    // Add callback function to list of callbacks
    this.callback = callback;
  }

}

/**
 * Object for callback functions and meta data about the functions
 */
interface Trigger {
  active: boolean; // Is this link currently active
  offsetTop: Function; // Function to get current offsetTop for currently active element
}
