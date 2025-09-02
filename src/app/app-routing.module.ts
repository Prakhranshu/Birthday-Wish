import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JourneyComponent } from './components/journey/journey.component';
import { RakhiComponent } from './components/rakhi/rakhi.component';
import { BirthdayMeetupComponent } from './components/birthday-meetup/birthday-meetup.component';
import { FarewellComponent } from './components/farewell/farewell.component';
import { SoloMediaComponent } from './components/solo-media/solo-media.component';
import { FinalMessageComponent } from './components/final-message/final-message.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'journey', component: JourneyComponent },
  { path: 'rakhi', component: RakhiComponent },
  { path: 'birthday-meetup', component: BirthdayMeetupComponent },
  { path: 'farewell', component: FarewellComponent },
  { path: 'solo-media', component: SoloMediaComponent },
  { path: 'final-message', component: FinalMessageComponent },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
