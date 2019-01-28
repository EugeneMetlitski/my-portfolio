import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivateSidenavLinksOnscrollService } from 'src/services/activate-sidenav-links-onscroll.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnDestroy {

  @ViewChild('introduction') introduction: ElementRef;
  @ViewChild('skills') skills: ElementRef;
  @ViewChild('education') education: ElementRef;

  constructor(private activateSidenavLinksOnscrollService: ActivateSidenavLinksOnscrollService) {
    this.activateSidenavLinksOnscrollService.componentInit('Bio', [
      () => this.introduction.nativeElement.offsetTop,
      () => this.skills.nativeElement.offsetTop,
      () => this.education.nativeElement.offsetTop
    ]);
  }

  ngOnDestroy(): void {
    this.activateSidenavLinksOnscrollService.componentDestroyed('Bio');
  }

}
