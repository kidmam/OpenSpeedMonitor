import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { LandingComponent } from "../components/landing/landing.component";

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    LandingComponent
  ],
  bootstrap: [LandingComponent]

})

export class LandingModule { }
