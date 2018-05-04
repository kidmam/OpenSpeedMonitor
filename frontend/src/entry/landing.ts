import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {LandingModule} from "../app/modules/landing.module";

platformBrowserDynamic().bootstrapModule(LandingModule)
  .catch(err => console.log(err));

