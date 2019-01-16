import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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
import { ProjectsComponent } from './content/projects/projects/projects.component';
import { ResumeComponent } from './content/resume/resume.component';
import { ContactComponent } from './content/contact/contact.component';
import { WorkoutAppComponent } from './content/projects/workout-app/workout-app.component';
import { MoneyTrackerComponent } from './content/projects/money-tracker/money-tracker.component';
import { SidebarContentService } from 'src/services/sidebar-content.service';


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
    ResumeComponent,
    ContactComponent,
    WorkoutAppComponent,
    MoneyTrackerComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'bio', component: BioComponent },
      { path: 'projects', component: ProjectsComponent,
        children: [
          { path: '', redirectTo: 'workout-app', pathMatch: 'full' },
          { path: 'workout-app', component: WorkoutAppComponent },
          { path: 'money-tracker', component: MoneyTrackerComponent },
        ] },
      { path: 'resume', component: ResumeComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    SidebarContentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
