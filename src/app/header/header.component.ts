import { CustomTransition } from 'src/utils/animations/custom-transition';
import { Component, Output, EventEmitter, Input, OnChanges, ElementRef, SimpleChanges } from '@angular/core';
import { ShowOnScrollUp } from 'src/utils/animations/scroll-transitions';
import { Media } from '../app.component';
import { smoothScrollTo } from 'src/utils/animations/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  title = `Portfolio`;
  @Input() btnHeaderDown: boolean;
  @Input() media: Media;
  @Output() btnSidenavClick = new EventEmitter();

  btnScrlUp = false;
  isPhone: boolean;

  private showOnScrlUp = new ShowOnScrollUp(this.header.nativeElement, -299, 352);
  private showHeaderTransition = new CustomTransition(500);


  constructor(private header: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.btnHeaderDown.firstChange) {
      if (window.scrollY > 325) {
        if (this.btnHeaderDown) {
          this.showHeaderTransition.run([
            { start: -140, end: -299 }
          ], (vals) => {
            this.header.nativeElement.style.top = `${vals}px`;
          });
          this.btnScrlUp = false;
        } else {
          this.showHeaderTransition.run([
            { start: -299, end: -140 }
          ], (vals) => {
            this.header.nativeElement.style.top = `${vals}px`;
          });
          this.btnScrlUp = true;
        }
      }
    }

    // Clear inline styles set by javascript
    this.header.nativeElement.style = '';

    if (this.media === Media.phone) {
      this.isPhone = true;
      this.showOnScrlUp.activate();
    } else {
      this.isPhone = false;
      this.showOnScrlUp.deactivate();
      this.btnScrlUp = false;
    }
  }

  onBtnSidenavClicked() {
    this.btnSidenavClick.emit();
  }

  onBtnScrlUpClicked() {
    this.btnScrlUp = false;
    smoothScrollTo(0, 700);
  }

}
