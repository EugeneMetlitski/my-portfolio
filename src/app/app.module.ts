import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { SidebarButtonComponent } from './components/sidebar-button/sidebar-button.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { SidebarContentService } from './services/sidebar-content.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    ProfilePictureComponent,
    SidebarButtonComponent,
    SidebarComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SidebarContentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
