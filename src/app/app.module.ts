import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { SidebarButtonComponent } from './components/sidebar-button/sidebar-button.component';
import { SidenavComponent } from './components/sidebar/sidebar.component';
import { SidebarContentService } from './services/sidebar-content.service';
import { BioComponent } from './components/content/bio/bio.component';
import { ResumeComponent } from './components/content/resume/resume.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjectsComponent } from './components/content/projects/projects/projects.component';
import { WorkoutAppComponent } from './components/content/projects/workout-app/workout-app.component';
import { MoneyTrackerComponent } from './components/content/projects/money-tracker/money-tracker.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    ProfilePictureComponent,
    SidebarButtonComponent,
    SidenavComponent,
    BioComponent,
    ResumeComponent,
    ContactComponent,
    NotFoundComponent,
    WorkoutAppComponent,
    MoneyTrackerComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
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
