import { Component } from '@angular/core';
import { ToggleButtonService } from '../../services/toggle-button.service';

@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.scss']
})
export class HamburgerButtonComponent {

  constructor(private toggleButton: ToggleButtonService) { }

  click = () => {
    this.toggleButton.toggle();
  }

}
