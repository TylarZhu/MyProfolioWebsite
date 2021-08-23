import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutMeComponent } from './about-me/about-me.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ResumeComponent } from './resume/resume.component';
import { DiscussionBoardComponent } from './discussion-board/discussion-board.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: NavigationComponent},
  { path: 'aboutMe', component: AboutMeComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'discussion', component: DiscussionBoardComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
