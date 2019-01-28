import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title = `Portfolio`;
  @Input() renderBtnSidenav = true;
  @Output() btnSidenavClick = new EventEmitter();

  onBtnSidenavClicked() {
    this.btnSidenavClick.emit();
  }

}
