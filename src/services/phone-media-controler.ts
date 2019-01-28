import { smoothScrollTo } from 'src/utils/animations/animations';
import { CustomTransition } from 'src/utils/animations/custom-transition';

/**
 * Note: Make sure to run this classes init() method in ngAfterViewInit() function.
 */
export class PhoneMediaControler {
  //#region variables

  // Elements
  private header: State;
  private btnHeaderUpDown: State;
  private btnHeaderScrlUp: State;
  private btnSidenav;
  // General variables
  private transitionDuration = 500;
  private transition = new CustomTransition(this.transitionDuration);
  private firstCall_Activate = false; // Has activate() method been called yet
  private eventsAdded: boolean; // Have events been added to dom elements
  private scrlPause:   boolean; // Should onScroll function be skipped?
  private isArrowDown: boolean; // Is the arrow btn pointing down or up?
  private isSidenavExpanded: boolean;
  // Scroll variables for defining points
  private scrl_headerVisible = 318; // scrollY when header is hidden
  private scrl_btnVisible    = 371; // scrollY when btnHeaderUpDown should be rendered
  // Scroll variables for helping methods
  private prevScrollY = 0; // scrollY value in previous frame
  private ds = 0; // Difference between previous scrollY and current scrollY

  //#endregion
  //#region init

  /**
   * This method needs to run in ngAfterViewInit() after html has been added to dom.
   * This method get's references to some dom elements and adds event listeners.
   */
  init() {
    this.header = new State(document.getElementsByTagName('app-header')[0]);
    this.header.top_hidden   = -352;
    this.header.top_visible  = -298;
    this.header.top_expanded = -140;
    this.btnHeaderUpDown = new State(document.getElementById('btnHeaderUpDown'));
    this.btnHeaderUpDown.top_hidden   = -42;
    this.btnHeaderUpDown.top_visible  = 12;
    this.btnHeaderUpDown.top_expanded = 170;
    this.btnHeaderUpDown.visible = false;
    this.btnHeaderScrlUp = new State(document.getElementById('btnScrlUp'));
    this.btnHeaderScrlUp.visible = false;
    this.btnSidenav = document.getElementsByTagName('app-sidebar-button')[0];
    this.activate();
  }

  //#endregion
  //#region public methods

  activate = () => {
    // The first time this is called is before any views are rendered,
    // therefore exit this function the first time it's called.
    if (!this.firstCall_Activate) {
      this.firstCall_Activate = true;
      return;
    }

    if (!this.eventsAdded) {
      this.eventsAdded = true;
      window.addEventListener('scroll', this.onScroll);
      this.btnHeaderUpDown.element.addEventListener('click', this.onClick_btnHeaderUpDown);
      this.btnHeaderScrlUp.element.addEventListener('click', this.onClick_btnHeaderScrlUp);
      this.btnSidenav.firstChild.addEventListener('click', this.onClick_btnSidenav);

      this.header.top_current = this.header.top_visible;
      this.btnHeaderUpDown.top_current = this.header.top_hidden;
      this.isArrowDown = true;
      this.isSidenavExpanded = false;
      this.scrlPause = false;
    }
  }

  deactivate = () => {
    if (this.eventsAdded) {
      this.header.element.style = '';
      this.btnHeaderUpDown.visible = false;
      this.btnHeaderScrlUp.visible = false;
      this.btnHeaderUpDown.element.style.transform = `rotateX(0deg)`;

      this.eventsAdded = false;
      window.removeEventListener('scroll', this.onScroll);
      this.btnSidenav.firstChild.removeEventListener('click', this.onClick_btnSidenav);
      this.btnHeaderUpDown.element.removeEventListener('click', this.onClick_btnHeaderUpDown);
    }
  }

  //#endregion
  //#region private methods

  private onScroll = () => {
    // Calculate difference betweeen last & current scrollY
    this.ds = window.scrollY - this.prevScrollY;
    this.prevScrollY = window.scrollY;

    // if (this.scrlPause) { return; }

    // If scrolled below point where header is visible
    if (window.scrollY > this.scrl_headerVisible) {
      if (window.scrollY > this.scrl_btnVisible) {

        if (
          !this.isArrowDown &&
          this.ds > 0 &&
          this.btnHeaderUpDown.visible &&
          this.btnHeaderUpDown.top_current <= this.btnHeaderUpDown.top_visible + 10
        ) {
          this.isArrowDown = true;
          this.transition.run([
            { start: 180, end: 0 }
          ], (vals) => {
            this.btnHeaderUpDown.element.style.transform = `rotateX(${vals[0]}deg)`;
          });
        }

      } else {
        if (this.isArrowDown) {
          if (this.btnHeaderUpDown.visible) {
            this.btnHeaderUpDown.fadeOut(new CustomTransition(250), this.transitionDuration);
          }
          if (this.btnHeaderScrlUp.visible) {
            this.btnHeaderScrlUp.fadeOut(new CustomTransition(250), this.transitionDuration);
          }
        }
      }
      if (!this.scrlPause) { this.btnHeaderUpDown.incrementTop(-this.ds, !this.isArrowDown); }
      if (!this.scrlPause) { this.header.incrementTop(-this.ds, !this.isArrowDown); }
    } else {
      if (this.btnHeaderUpDown.visible) {
        this.btnHeaderUpDown.fadeOut(new CustomTransition(250), this.transitionDuration);
      }
      if (this.btnHeaderScrlUp.visible) {
        this.btnHeaderScrlUp.fadeOut(new CustomTransition(250), this.transitionDuration);
      }
      if (window.scrollY < 160 && this.header.top_current !== this.header.top_visible) {
        this.header.top_current = this.header.top_visible;
      }
    }
  }

  private onClick_btnHeaderUpDown = () => {
    if (!this.btnHeaderScrlUp.visible) {
      this.btnHeaderScrlUp.visible = true;
      this.btnHeaderScrlUp.element.style.opacity = '1';
    }

    if (this.isArrowDown) {
      if (this.isSidenavExpanded) {
        this.btnSidenav.firstChild.click();
      }

      this.transition.run([
        { start: this.header.top_current, end: this.header.top_expanded },
        { start: this.btnHeaderUpDown.top_current, end: this.btnHeaderUpDown.top_expanded },
        { start: 0, end: 180 }
      ], (vals) => {
        this.header.top_current = vals[0];
        this.btnHeaderUpDown.top_current = vals[1];
        this.btnHeaderUpDown.element.style.transform = `rotateX(${vals[2]}deg)`;
      });
    } else {
      this.transition.run([
        { start: this.header.top_current, end: this.header.top_visible },
        { start: this.btnHeaderUpDown.top_current, end: this.btnHeaderUpDown.top_visible },
        { start: 180, end: 0 }
      ], (vals) => {
        this.header.top_current = vals[0];
        this.btnHeaderUpDown.top_current = vals[1];
        this.btnHeaderUpDown.element.style.transform = `rotateX(${vals[2]}deg)`;
      });
    }
    this.isArrowDown = !this.isArrowDown;
  }

  private onClick_btnHeaderScrlUp = () => {
    this.btnHeaderUpDown.fadeOut(new CustomTransition(300), this.transitionDuration);
    this.btnHeaderScrlUp.fadeOut(new CustomTransition(300), this.transitionDuration);
    smoothScrollTo(0, 700);
    setTimeout(() => {
      this.header.top_current = this.header.top_visible;
    }, 650);
  }

  private onClick_btnSidenav = () => {
    this.isSidenavExpanded = !this.isSidenavExpanded;

    this.scrlPause = !this.scrlPause;
    if (!this.scrlPause) { return; }

    if (window.scrollY < this.scrl_headerVisible) {
      smoothScrollTo(318, 750);

    } if (this.header.top_current !== this.header.top_visible) {

      let rotation: number;
      if (this.isArrowDown) {
        rotation = 0;
      } else {
        rotation = 180;
        this.isArrowDown = true;
      }

      this.transition.run([
        { start: this.header.top_current, end: this.header.top_visible },
        { start: this.btnHeaderUpDown.top_current, end: this.btnHeaderUpDown.top_visible },
        { start: rotation, end: 0 },
      ], (vals) => {
        this.header.top_current = vals[0];
        this.btnHeaderUpDown.top_current = vals[1];
        this.btnHeaderUpDown.element.style.transform = `rotateX(${vals[2]}deg)`;
      });
    }
  }

  //#endregion

}

/**
 * This class helps keep track of and work with elements that are used
 * by PhoneMediaController class.
 */
class State {
  private _visible: boolean;
  private _top_current: number;
  private transitionRunning = false;
  top_hidden: number;
  top_visible: number;
  top_expanded: number;

  constructor(private el) {}

  get element() {
    return this.el;
  }
  get top_current(): number {
    return this._top_current;
  }
  set top_current(value: number) {
    this.el.style.top = `${value}px`;
    this._top_current = value;
  }
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this.el.style.visibility = value ? 'visible' : 'hidden';
    this._visible = value;
  }

  /**
   * Increment and set top style within bounds so that it's not
   * > it's visible top value and not < it's hidden top value.
   *
   * @param value how many pixels to increment by
   * @param isExpanded is the header expanded or collapsed?
   */
  incrementTop(value: number, isExpanded: boolean) {
    if (!this.visible) {
      this.visible = true;
      this.top_current = this.top_hidden;
      this.el.style.opacity = '1';
    }

    if (!isExpanded || value < 0) {
      this._top_current += value;
    }

    if (value > 0 && !isExpanded && this._top_current > this.top_visible) {
      this._top_current = this.top_visible;
    } else if (this.top_current < this.top_hidden) {
      this._top_current = this.top_hidden;
    }
    this.el.style.top = `${this._top_current}px`;
  }

  fadeOut(transition: CustomTransition, transitionDuration: number, callback?: Function) {
    if (this.transitionRunning) { return; }
    this.transitionRunning = true;

    transition.run([
      { start: 1, end: 0 },
    ], (vals) => {
      this.el.style.opacity = `${vals[0]}`;
    });
    setTimeout(() => {
      this.transitionRunning = false;
      this.visible = false;
      this.el.style.opacity = '1';
      this.el.style.transform = '';
      if (callback) { callback(); }
    }, transitionDuration);
  }
}
