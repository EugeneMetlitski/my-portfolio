import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarStateService } from './services/sidebar-state.service';
import { SidebarContentService } from './services/sidebar-content.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  //#region variables

  @ViewChild('bg') bg: ElementRef; // Background element
  @ViewChild('rw') rw: ElementRef; // Render-Width element
  @ViewChild('wl') wl: ElementRef; // Wall element

  //#endregion
  //#region init

  constructor(
    private stateService: SidebarStateService,
    private contentService: SidebarContentService
  ) {
    this.setupSateService();
  }

  //#endregion
  //#region getters & setters

  /**
   * The title of sidebar.
   */
  get title() { return `Projects`; }

  /**
   * The width of sidebar is determined by the content loaded
   * to the sidebar (i.e. how wide headings and links are).
   */
  private get w() { return document
      .getElementsByClassName('sidebar')[0]
      .getBoundingClientRect().width;
  }

  /**
   * Set the style left for the background element of the
   * sidebar. This moves sidebar, vertical line and sidebar's
   * background.
   */
  private set left(arg: string) {
    this.bg.nativeElement.style.left = arg;
  }

  /**
   * Set the rendered width for the sidebar (i.e. how much
   * width space will sidebar take up in document flow).
   */
  private set width(arg: string) {
    this.rw.nativeElement.style.width = arg;
  }

  /**
   * Set the width of the wall. Wall is the element behind
   * which sidebar hides when it is in hidden state.
   */
  private set wall(arg: string) {
    this.wl.nativeElement.style.width = arg;
  }

  //#endregion
  //#region private-functions

  /**
   * Subscribe to state service and provide a function to
   * be called when the state of sidebar changes.
   */
  private setupSateService = () => {

    // Provide function to call when sidebar-button is clicked
    this.stateService.subscribe((renderWidth: boolean) => {

      // If the sidebar is in visible state
      if (this.stateService.visible) {
        this.width = (renderWidth) ? `${this.w + 20}px` : `0`;
        this.left = `0`;
      } else {
        this.width = `0`;
        this.left = `-${this.w + 40}px`;
      }

      this.wall = `${this.w + 40}px`;
    });
  }

  //#endregion
}
