import { Component, OnInit } from '@angular/core';
import { WindowResize } from 'src/utils/widnow-resize';
import { State } from '../sidebar/services/state.service';

/**
 * This compenent controlls any other components that need to have higher
 * level controls by accessing their services. This component is rendered
 * last, after all other components have already been rendered (If something
 * needs to be rendered first, place it in the app component).
 */
@Component({
  selector: 'app-control',
  template: ''
})
export class ControlComponent implements OnInit {

  windowResize: WindowResize;
  private tablet = 800;
  private phone  = 600;

  constructor(private sidenavState: State) {
    this.windowResize = new WindowResize([this.tablet, this.phone]);
  }

  ngOnInit() {
    this.onDesktop();
    this.onTablet();
    this.onPhone();
  }

  private onDesktop = () => {
    this.windowResize.assignFunction(this.tablet, false, () => {
      this.sidenavState.setVisible(true, true);
    });
  }

  private onTablet = () => {
    this.windowResize.assignFunction(this.tablet, true, () => {
      this.sidenavState.setVisible(false, false);
    });
  }

  private onPhone = () => {
    this.windowResize.assignFunction(this.phone, true, () => {
      this.sidenavState.setVisible(false, false);
    });
  }

}
