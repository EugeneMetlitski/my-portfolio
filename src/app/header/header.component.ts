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

  @Input() btnHeaderDown: boolean;
  @Input() media: Media;
  @Output() btnSidenavClick = new EventEmitter();

  btnShowHeader = false;
  btnScrlUp = false;
  arrowDown = true;
  isPhone: boolean;

  private showOnScrlUp = new ShowOnScrollUp(this.header.nativeElement, -299, 352);
  private showHeaderTransition = new CustomTransition(500);
  private scrollListenerAdded = false;


  constructor(private header: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.btnHeaderDown.firstChange) {
      console.log(changes.btnHeaderDown.firstChange);
      if (window.scrollY < 325) {
        if (this.btnHeaderDown) {
          smoothScrollTo(319, 700);
        } else {
          smoothScrollTo(160, 700);
        }
      } else {
        if (this.btnHeaderDown) {
          this.showHeaderTransition.run([
            { start: -140, end: -299 }
          ], (vals) => {
            this.header.nativeElement.style.top = `${vals}px`;
          });
        } else {
          this.showHeaderTransition.run([
            { start: -299, end: -140 }
          ], (vals) => {
            this.header.nativeElement.style.top = `${vals}px`;
          });
        }
      }
    }

    // Clear inline styles set by javascript
    this.header.nativeElement.style = '';

    if (this.media === Media.phone) {
      this.isPhone = true;
      this.showOnScrlUp.activate();
      if (!this.scrollListenerAdded) {
        window.addEventListener('scroll', this.processScroll);
        this.scrollListenerAdded = true;
      }
    } else {
      this.isPhone = false;
      this.showOnScrlUp.deactivate();
      if (this.scrollListenerAdded) {
        window.removeEventListener('scroll', this.processScroll);
        this.scrollListenerAdded = false;
      }
      this.btnShowHeader = false;
      this.btnScrlUp = false;
    }
  }

  get title() {
    return `Portfolio`;
  }

  onBtnSidenavClicked() {
    this.btnSidenavClick.emit();
  }

  // onBtnShowHeaderClicked() {
  //   this.arrowDown = !this.arrowDown;
  //   if (!this.btnScrlUp) { this.btnScrlUp = true; }

  //   if (window.scrollY < 325) {
  //     if (this.arrowDown) {
  //       smoothScrollTo(319, 700);
  //     } else {
  //       smoothScrollTo(160, 700);
  //     }
  //   } else {
  //     if (this.arrowDown) {
  //       this.showHeaderTransition.run([
  //         { start: -140, end: -299 }
  //       ], (vals) => {
  //         this.header.nativeElement.style.top = `${vals}px`;
  //       });
  //     } else {
  //       this.showHeaderTransition.run([
  //         { start: -299, end: -140 }
  //       ], (vals) => {
  //         this.header.nativeElement.style.top = `${vals}px`;
  //       });
  //     }
  //   }
  // }

  // onBtnShowHeaderClicked() {
  //   this.arrowDown = !this.arrowDown;
  //   if (!this.btnScrlUp) { this.btnScrlUp = true; }

  //   if (window.scrollY < 325) {
  //     if (this.arrowDown) {
  //       smoothScrollTo(319, 700);
  //     } else {
  //       smoothScrollTo(160, 700);
  //     }
  //   } else {
  //     if (this.arrowDown) {
  //       this.showHeaderTransition.run([
  //         { start: -140, end: -299 },
  //         { start: 0, end: 180 },
  //         { start: 41, end: 200 }
  //       ], (vals) => {
  //         this.header.nativeElement.style.top = `${vals[0]}px`;
  //         document.getElementById('btnShowHeader').style.transform = `translate(0, -100%) rotateX(${vals[1]}deg)`;
  //         document.getElementById('btnShowHeader').style.top = `${vals[2]}px`;
  //       });
  //     } else {
  //       this.showHeaderTransition.run([
  //         { start: -299, end: -140 },
  //         { start: 180, end: 0 },
  //         { start: 200, end: 41 }
  //       ], (vals) => {
  //         this.header.nativeElement.style.top = `${vals[0]}px`;
  //         document.getElementById('btnShowHeader').style.transform = `translate(0, -100%) rotateX(${vals[1]}deg)`;
  //         document.getElementById('btnShowHeader').style.top = `${vals[2]}px`;
  //       });
  //     }
  //   }
  // }

  onBtnScrlUpClicked() {
    console.log(`btnScrlUpClicked`);
  }

  private processScroll = () => {
    if (window.scrollY > 352) {
      if (!this.btnShowHeader) {
        this.btnShowHeader = true;
      }
    } else if (window.scrollY < 150) {
      if (this.btnShowHeader) {
        this.btnShowHeader = false;
        this.btnScrlUp = false;
      }
    }
  }

}
