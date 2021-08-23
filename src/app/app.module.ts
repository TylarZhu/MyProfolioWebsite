import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ResumeComponent } from './resume/resume.component';
import { DiscussionBoardComponent } from './discussion-board/discussion-board.component';
import { MapComponent } from './map/map.component';

import { UserService } from './user.service';
import { MapService } from './map.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutMeComponent,
    ResumeComponent,
    DiscussionBoardComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqkO_0raeJamJUho7PgsIz-xfota8TSdA'
    })
  ],
  providers: [
    UserService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
