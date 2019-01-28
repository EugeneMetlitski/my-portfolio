import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './header/nav/nav.component';
import { ProfilePictureComponent } from './header/profile-picture/profile-picture.component';
import { BtnUpDownComponent } from './btn-up-down/header-button.component';
import { SidenavComponent } from './sidenav/sidebar.component';
import { SidebarButtonComponent } from './header/sidebar-button/sidebar-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BioComponent } from './content/bio/bio.component';
import { ResumeComponent } from './content/resume/resume.component';
import { ContactComponent } from './content/contact/contact.component';
import { ProjectsComponent } from './content/projects/projects.component';

import { ActivateSidenavLinksOnscrollService } from 'src/services/activate-sidenav-links-onscroll.service';
import { WebService } from 'src/services/web.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    ProfilePictureComponent,
    BtnUpDownComponent,
    SidenavComponent,
    SidebarButtonComponent,
    NotFoundComponent,
    BioComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'bio', pathMatch: 'full' },
      { path: 'bio', component: BioComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    ActivateSidenavLinksOnscrollService,
    WebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
