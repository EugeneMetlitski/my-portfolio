import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CustomTransition } from 'src/utils/animations/custom-transition';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class BtnUpDownComponent implements AfterViewInit {

  @Output() change = new EventEmitter();

  private btn: HTMLElement;
  private enabled = false;
  private transition = new CustomTransition(500);
  private arrowDown = false;
  private scrollYPrev = 0;
  private ds = 0; // Scroll difference from last to current scrollY value
  private currentTop: number;


  ngAfterViewInit() {
    this.btn = document.getElementById('btn');
    window.addEventListener('scroll', this.processScroll);
  }


  onClick = ($event: Event) => {
    $event.stopPropagation();
    this.change.emit();

    this.arrowDown = !this.arrowDown;
    if (this.arrowDown) {
      this.transition.run([
        { start: 0, end: 180 },
        { start: 41, end: 200 }
      ], (vals) => {
        this.btn.style.transform = `translate(0, -100%) rotateX(${vals[0]}deg)`;
        this.currentTop = vals[1];
        this.btn.style.top = `${this.currentTop}px`;
      });
    } else {
      this.transition.run([
        { start: 180, end: 0 },
        { start: 200, end: 41 }
      ], (vals) => {
        this.btn.style.transform = `translate(0, -100%) rotateX(${vals[0]}deg)`;
        this.currentTop = vals[1];
        this.btn.style.top = `${this.currentTop}px`;
      });
    }
  }

  private processScroll = () => {
    this.ds = window.scrollY - this.scrollYPrev;
    this.scrollYPrev = window.scrollY;

    if (window.scrollY >= 390) {
      if (!this.enabled) {
        this.enabled = true;
        this.arrowDown = false;
        this.currentTop = -12;
        this.btn.style.top = `${this.currentTop}px`;
        this.btn.style.transform = `translate(0, -100%) rotateX(0deg)`;
      }

      // If srolled up
      if (this.ds < 0) {
        // If btn is not fully visible yet
        if (this.currentTop < 41) {
          this.currentTop = this.currentTop - this.ds;
          if (this.currentTop > 41) { this.currentTop = 41; }
          this.btn.style.top = `${this.currentTop}px`;
        }
      } else {
        if (this.currentTop > -12) {
          this.currentTop = this.currentTop - this.ds;
          if (this.currentTop < -12) { this.currentTop = -12; }
          this.btn.style.top = `${this.currentTop}px`;
        }
        if (this.currentTop === -12) { this.enabled = false; }
      }

    } else if (window.scrollY < 330) {
      if (this.enabled) {
        this.enabled = false;
      }
    }
  }

}
