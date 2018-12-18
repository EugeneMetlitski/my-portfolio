import { Component } from '@angular/core';
import { State } from '../sidebar/services/state.service';

@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.scss']
})
export class HamburgerButtonComponent {

  constructor(private sidenavHideSate: State) { }

  click = () => {
    this.sidenavHideSate.toggleVisible();
  }

}
