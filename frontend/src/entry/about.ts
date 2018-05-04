import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {AboutModule} from "../app/modules/about.module";

platformBrowserDynamic().bootstrapModule(AboutModule)
  .catch(err => console.log(err));
