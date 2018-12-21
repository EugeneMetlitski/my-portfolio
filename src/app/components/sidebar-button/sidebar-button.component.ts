import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent {

  @Output() change = new EventEmitter();

  onClick = () => {
    this.change.emit();
  }

}
