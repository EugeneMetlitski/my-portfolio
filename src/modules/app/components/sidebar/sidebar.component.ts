import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { ToggleSidenavService } from './../../services/toggle-sidenav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @HostBinding('class.hide-sidebar') hide: boolean;


  constructor(
    private toggleSidenav: ToggleSidenavService,
    private el: ElementRef) { }

  ngOnInit() {
    // Get the value of wether sidebar is visible
    this.hide = !this.toggleSidenav.visible;

    // Provide function to call when hanburger button clicked
    this.toggleSidenav.subscribe(() => {
      this.hide = !this.toggleSidenav.visible;
      console.log(this.el.nativeElement.offsetWidth);
    });
  }

}
