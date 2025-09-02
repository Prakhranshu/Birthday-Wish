import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JourneyComponent } from './components/journey/journey.component';
import { RakhiComponent } from './components/rakhi/rakhi.component';
import { BirthdayMeetupComponent } from './components/birthday-meetup/birthday-meetup.component';
import { FarewellComponent } from './components/farewell/farewell.component';
import { SoloMediaComponent } from './components/solo-media/solo-media.component';
import { FinalMessageComponent } from './components/final-message/final-message.component';

@NgModule({
  declarations: [
    AppComponent,
    JourneyComponent,
    RakhiComponent,
    BirthdayMeetupComponent,
    FarewellComponent,
    SoloMediaComponent,
    FinalMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
