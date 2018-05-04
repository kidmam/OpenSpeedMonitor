import {enableProdMode} from "@angular/core";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from "../environments/environment";

import { LandingModule } from "../app/landing/landing.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(LandingModule)
  .catch(err => console.log(err));
