import { ShowOnScrollUp } from './../../../utils/animations/scroll-transitions';
import { Component, Output, EventEmitter, Input, OnChanges, AfterViewInit, ElementRef } from '@angular/core';

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
