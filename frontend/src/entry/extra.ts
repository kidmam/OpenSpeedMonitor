import { enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from "../environments/environment";

import { ExtraModule } from "../app/extra/extra.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ExtraModule)
  .catch(err => console.log(err));
