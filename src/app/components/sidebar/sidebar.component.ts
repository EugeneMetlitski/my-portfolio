import { CustomTransition } from '../../../utils/animations/custom-transition';
import { Component, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {

  @Input() content;
  private hide: boolean;
  private renderWidth: boolean;
  private anim = new CustomTransition(500);

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

  constructor(private _router: Router) {}

  ngAfterViewInit() {
    this.update();
  }

  //#endregion
  //#region public functions

  /**
   * Update the state of the navbar.
   *
   * @param state is an object that implements State interface. This
   * interface has the following values:
   * @param hidden is the sidebar hidden or visible?
   * @param renderWidth should the sidebar take up width in document flow?
   */
  setState(state: State) {
    this.hide = state.hidden;
    this.renderWidth = state.renderWidth;
    this.update();
  }

  /**
   * Toggle the navbar state between hidden and visible.
   */
  toggleHidden = () => {
    this.hide = !this.hide;
    this.update(true);
  }

  //#endregion
  //#region private functions

  private update(transition?: boolean) {
    // if (!this.afterInitRun) { return; }
    if (this.hide) {
      if (transition) {
        this.anim.run([
          { start: this.w + 20, end: 0 },
          { start: 0, end: -(this.w + 40) },
        ], (vals) => {
          this.width = (this.renderWidth) ? vals[0] + 'px' : `0`;
          this.left = vals[1] + 'px';
        });
      } else {
        this.width = `0`;
        this.left = `-${this.w + 40}px`;
      }
    } else {
      if (transition) {
        this.anim.run([
          { start: 0, end: this.w + 20 },
          { start: -(this.w + 40), end: 0 },
        ], (vals) => {
          this.width = (this.renderWidth) ? vals[0] + 'px' : `0`;
          this.left = vals[1] + 'px';
        });
      } else {
        this.width = (this.renderWidth) ? `${this.w + 20}px` : `0`;
        this.left = `0`;
      }
    }
    this.wall = `${this.w + 40}px`;
  }

  isActivePage(page: string): boolean {
    return '/' + page === this._router.url;
}

  //#endregion
}

/**
 * This describes the state of the sidebar.
 *
 * @param hidden is the sidebar hidden or visible?
 * @param renderWidth should the sidebar take up width in document flow?
 */
export interface State {
  hidden: boolean;
  renderWidth: boolean;
}
