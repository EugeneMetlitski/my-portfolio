import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { CustomTransition } from 'src/utils/animations/custom-transition';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidenavComponent implements AfterViewInit, OnChanges {
  //#region variables

  @Input() content;
  @Input() hide = false;
  @Input() renderWidth = true;
  @Input() useTransition = true;
  private anim = new CustomTransition(500);

  //#endregion
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

  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }

  //#endregion
  //#region private functions

  /**
   * Update the state of sidenav. Whether it should be hidden or visible,
   * and whether it should render width or not. Based on input variables
   * hide and renderWidth.
   */
  private update() {
    // if (!this.afterInitRun) { return; }
    if (this.hide) {
      if (this.useTransition) {
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
      if (this.useTransition) {
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

  /**
   * This function is used by the view to determine which
   * link in the sidenav should be active based on url.
   */
  private isActivePage(page: string): boolean {
    return '/' + page === this._router.url;
  }

  //#endregion
}
