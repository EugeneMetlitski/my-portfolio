import { Component, Output, EventEmitter } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent {

  @Output() change = new EventEmitter();

  onClick = ($event: Event) => {
    $event.stopPropagation();
    this.change.emit();
  }

}
