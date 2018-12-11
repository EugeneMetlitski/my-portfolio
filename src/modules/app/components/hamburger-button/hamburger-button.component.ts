import { Component, OnInit } from '@angular/core';
import { ToggleSidenavService } from '../../services/toggle-sidenav.service';

@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.scss']
})
export class HamburgerButtonComponent implements OnInit {

  constructor(private toggleSidenav: ToggleSidenavService) { }

  ngOnInit() {
  }

  click = () => {
    this.toggleSidenav.toggle();
  }

}
