import { Injectable } from '@angular/core';
import { WindowResize } from 'src/utils/widnow-resize';
import { SidebarStateService } from './sidebar/services/sidebar-state.service';

/**
 * This service controlls any other components that need to have higher
 * level controls by accessing their services. This service has to be
 * rendered last, after all other components have already been rendered
 * (If something needs to be rendered first, place it in the app
 * component).
 */
@Injectable({
  providedIn: 'root'
})
export class ControlService {

  windowResize: WindowResize;
  private tablet = 800;
  private phone  = 600;

  constructor(private sidebarState: SidebarStateService) {
    this.windowResize = new WindowResize([this.tablet, this.phone]);
  }

  init() {
    this.onDesktop();
    this.onTablet();
    this.onPhone();
  }

  private onDesktop = () => {
    this.windowResize.assignFunction(this.tablet, false, () => {
      this.sidebarState.setVisible(true, true);
    });
  }

  private onTablet = () => {
    this.windowResize.assignFunction(this.tablet, true, () => {
      this.sidebarState.setVisible(false, false);
    });
  }

  private onPhone = () => {
    this.windowResize.assignFunction(this.phone, true, () => {
      this.sidebarState.setVisible(false, false);
    });
  }

}
