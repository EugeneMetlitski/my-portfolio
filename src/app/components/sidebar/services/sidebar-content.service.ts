import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarContentService {

  get content() {
    return [
      {
        title: `Personal`,
        links: [
          { txt: `Workout App`, active: true },
          { txt: `Money Manager`, active: false },
          { txt: `Chess AI Game`, active: false }
        ]
      },
      {
        title: `Uni / Tafe`,
        links: [
          { txt: `.Net Project`, active: false },
          { txt: `Java Project`, active: false }
        ]
      }
    ];
  }

}
