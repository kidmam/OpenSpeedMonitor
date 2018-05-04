import { NgModule } from '@angular/core';
import { ExtraComponent } from '../components/extra/extra.component';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [ExtraComponent],
  bootstrap: [ExtraComponent]
})
export class ExtraModule { }
