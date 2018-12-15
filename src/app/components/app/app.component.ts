import { SidebarService, State } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { WindowResize } from '../../../utils/widnow-resize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  windowResize: WindowResize;
  private tablet = 800;
  private phone  = 600;

  constructor(private sidebarService: SidebarService) {
    this.windowResize = new WindowResize([this.tablet, this.phone]);
  }

  ngOnInit() {
    this.onDesktop();
    this.onTablet();
    this.onPhone();
  }

  private onDesktop = () => {
    this.windowResize.assignFunction(this.tablet, false, () => {
      this.sidebarService.setState(State.InsideDocumentFlow);
    });
  }

  private onTablet = () => {
    this.windowResize.assignFunction(this.tablet, true, () => {
      this.sidebarService.setState(State.OutsideDocumentFlow);
    });
  }

  private onPhone = () => {
    this.windowResize.assignFunction(this.phone, true, () => {
      this.sidebarService.setState(State.OutsideDocumentFlow);
    });
  }
}
