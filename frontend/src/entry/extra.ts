import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ExtraModule } from "../app/modules/extra.module";

platformBrowserDynamic().bootstrapModule(ExtraModule)
  .catch(err => console.log(err));
