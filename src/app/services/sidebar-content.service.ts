import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarContentService {

  get content() {
    return {
      title: 'Projects',
      sections: [
        {
          title: `Personal`,
          links: [
            { txt: `Workout App`,    url: 'projects/workout-app' },
            { txt: `Money Manager`,  url: 'projects/money-tracker' },
            // { txt: `Chess AI Game`,  link: 'workout-app' }
          ]
        },
        // {
        //   title: `Uni / Tafe`,
        //   links: [
        //     { txt: `.Net Project`,   link: 'money-tracker' },
        //     { txt: `Java Project`,   link: 'workout-app' }
        //   ]
        // }
      ]
    };
  }

}
