import { Component } from '@angular/core';
import { SidebarStateService } from '../sidebar/services/sidebar-state.service';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent {

  constructor(private sidebarHide: SidebarStateService) { }

  click = () => {
    this.sidebarHide.toggleVisible();
  }

}
