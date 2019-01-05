import { Component, Output, EventEmitter, Input, OnChanges, ElementRef } from '@angular/core';
import { ShowOnScrollUp } from 'src/utils/animations/scroll-transitions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  @Input() showOnScrollUp: boolean;
  @Output() change = new EventEmitter();
  private scroll = new ShowOnScrollUp(this.header.nativeElement, -299, 352);

  constructor(private header: ElementRef) {}

  ngOnChanges() {
    // Clear styles set by javascript on media change (window width change)
    this.header.nativeElement.style = '';
    // Determine if showOnScrollUp should be activated
    (this.showOnScrollUp) ? this.scroll.activate() : this.scroll.deactivate();
  }

  get title() {
    return `Portfolio`;
  }

  onChange = () => {
    this.change.emit();
  }

}
