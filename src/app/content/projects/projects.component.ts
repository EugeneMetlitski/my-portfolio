import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivateSidenavLinksOnscrollService } from 'src/services/activate-sidenav-links-onscroll.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnDestroy {

  @ViewChild('portfolio_site') portfolio_site: ElementRef;
  @ViewChild('workout_app') workout_app: ElementRef;

  constructor(private activateSidenavLinksOnscrollService: ActivateSidenavLinksOnscrollService) {
    this.activateSidenavLinksOnscrollService.componentInit('Projects', [
      () => this.portfolio_site.nativeElement.offsetTop,
      () => this.workout_app.nativeElement.offsetTop,
    ]);
  }

  ngOnDestroy(): void {
    this.activateSidenavLinksOnscrollService.componentDestroyed('Projects');
  }

}
