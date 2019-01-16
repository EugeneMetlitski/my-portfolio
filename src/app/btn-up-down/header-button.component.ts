import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss'],
  animations: [
    trigger('toggle-visibility', [
      state('visible', style({
        opacity: '1'
      })),
      state('hidden', style({
        opacity: '0'
      })),
      transition('visible => hidden', [
        animate('1s')
      ])
    ]),
    trigger('flip-arrow', [
      state('up', style({
        transform: 'translate(0, -100%) rotateX(0deg)'
      })),
      state('down', style({
        transform: 'translate(0, -100%) rotateX(180deg)'
      })),
      transition('up <=> down', [
        animate('1s')
      ])
    ])
  ]
})
export class BtnUpDownComponent {

  @Input() arrowUp = false;
  @Input() enabled = true;
  // @Output() click = new EventEmitter();

  // onClick = ($event: Event) => {
  //   $event.stopPropagation();
  //   this.click.emit();
  // }

}
