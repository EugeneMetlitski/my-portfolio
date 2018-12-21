import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowResize } from 'src/utils/widnow-resize';
import { SidebarComponent, State } from './../sidebar/sidebar.component';
import { SidebarContentService } from '../../services/sidebar-content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  windowResize: WindowResize;
  private tablet = 800;
  private phone  = 600;

  @ViewChild('sb') sb: SidebarComponent;


  constructor(private sbContent: SidebarContentService) { }

  ngOnInit() {
    this.windowResize = new WindowResize([this.tablet, this.phone]);
    this.onDesktop();
    this.onTablet();
    this.onPhone();
  }


  private onDesktop = () => {
    this.windowResize.assignFunction(this.tablet, false, () => {
      this.sb.setState({
        hidden: false,
        renderWidth: true,
      });
    });
  }

  private onTablet = () => {
    this.windowResize.assignFunction(this.tablet, true, () => {
      this.sb.setState({
        hidden: true,
        renderWidth: false,
      });
    });
  }

  private onPhone = () => {
    this.windowResize.assignFunction(this.phone, true, () => {
      this.sb.setState({
        hidden: true,
        renderWidth: false,
      });
    });
  }

  private onBtnSidebarClicked = () => {
    this.sb.toggleHidden();
  }

}
