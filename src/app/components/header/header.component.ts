import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  @Input() showOnScrollUp: boolean;
  @Output() change = new EventEmitter();

  ngOnChanges() {
    console.log(this.showOnScrollUp);
  }

  get title() {
    return `Portfolio`;
  }

  onChange = () => {
    this.change.emit();
  }

}
