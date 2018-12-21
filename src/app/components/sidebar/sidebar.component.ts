import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {

  @Input() content;
  private hide: boolean;
  private renderWidth: boolean;
  private afterInitRun = false;

//#region getters & setters

  /**
   * The width of sidebar is determined by the content loaded
   * to the sidebar (i.e. how wide headings and links are).
   */
  private get w() {
    return document
      .getElementsByClassName('sidebar')[0]
      .getBoundingClientRect().width;
  }

  /**
   * Set the style left for the background element of the
   * sidebar. This moves sidebar, vertical line and sidebar's
   * background.
   */
  private set left(arg: string) {
    document.getElementById('sidebarBackground').style.left = arg;
  }

  /**
   * Set the rendered width for the sidebar (i.e. how much
   * width space will sidebar take up in document flow).
   */
  private set width(arg: string) {
    document.getElementById('sidebarWidth').style.width = arg;
  }

  /**
   * Set the width of the wall. Wall is the element behind
   * which sidebar hides when it is in hidden state.
   */
  private set wall(arg: string) {
    document.getElementById('sidebarWall').style.width = arg;
  }

  //#endregion
  //#region init

  ngAfterViewInit() {
    this.afterInitRun = true;
    this.update();
  }

  //#endregion
  //#region public functions

  /**
   * Update the state of the navbar.
   *
   * @param hide is the navbar hidden?
   * @param renderWidth should the navbar take up space in document flow
   */
  setState(hide: boolean, renderWidth: boolean) {
    this.hide = hide;
    this.renderWidth = renderWidth;
    this.update();
  }

  /**
   * Toggle the navbar state between hidden and visible.
   */
  toggleHidden = () => {
    this.hide = !this.hide;
    this.update();
  }

  //#endregion
  //#region private functions

  private update() {

    if (!this.afterInitRun) { return; }

    if (this.hide) {
      this.width = `0`;
      this.left = `-${this.w + 40}px`;
    } else {
      this.width = (this.renderWidth) ? `${this.w + 20}px` : `0`;
      this.left = `0`;
    }
    this.wall = `${this.w + 40}px`;
  }

  //#endregion
}
