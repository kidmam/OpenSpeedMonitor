import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

import { AboutModule } from "./components/about/about.module";
import { LandingModule } from "./components/landing/landing.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AboutModule)
  .catch(err => console.log(err));

platformBrowserDynamic().bootstrapModule(LandingModule)
  .catch(err => console.log(err));
