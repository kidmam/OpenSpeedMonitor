Proof of Concept für neues Frontend mit Angular
---
Bei dem momentanen PoC werden die einzelnen Bestandteile einer Anwendung in unabhängige Module aufgeteilt.
Diese Module können in einer beliebigen `.gsp` mit den dazugehörigen Ressourcen eingebunden werden. Innerhalb eines
Moduls können mehrere Komponenten eingebunden werden. Jedes Modul hat folglich sein eigenes JavaScript Bundle. Einbinden kann man ein Modul durch einen simplen HTML-Tag.
Beispielsweise wird nachfolgend das Modul `landing` in `index.gsp` eingebunden.

```gsp
<body>
...
<app-landing></app-landing> (Einbinden des Moduls)

<script type=text/javascript src="<g:assetPath src='/frontend/inline.bundle.js'/>"></script>
<script type=text/javascript src="<g:assetPath src='/frontend/polyfills.bundle.js'/>"></script>
<script type=text/javascript src="<g:assetPath src='/frontend/styles.bundle.js'/>"></script>
<script type=text/javascript src="<g:assetPath src='/frontend/vendor.bundle.js'/>"></script>
<script type=text/javascript src="<g:assetPath src='/frontend/landing.bundle.js'/>"></script> (Jeweils zugehöriges Bundle zum benutzen Modul)
</body>
```
### Ordnerstruktur
Die Ordnerstruktur ist noch zu verändern. Zum Testen wurde momentan folgende Ordnerstruktur aufgesetzt.
```
frontend
├── dist
├── e2e
├── karma.conf.js
├── node_modules
├── package.json
├── package-lock.json
├── protractor.conf.js
├── README.md
├── src
│   ├── app
│   │   ├── components (Sammlung an Komponenten)
│   │   │   ├── about
│   │   │   │   ├── about.component.css
│   │   │   │   ├── about.component.html
│   │   │   │   ├── about.component.spec.ts
│   │   │   │   └── about.component.ts
│   │   │   ├── extra
│   │   │   │   ├── extra.component.css
│   │   │   │   ├── extra.component.html
│   │   │   │   ├── extra.component.spec.ts
│   │   │   │   ├── extra.component.ts
│   │   │   │   ├── extra.service.spec.ts
│   │   │   │   └── extra.service.ts
│   │   │   └── landing
│   │   │       ├── landing.component.css
│   │   │       ├── landing.component.html
│   │   │       ├── landing.component.spec.ts
│   │   │       └── landing.component.ts
│   │   └── modules (Die Module, welche zugehörige Komponenten deklarieren)
│   │       ├── about.module.ts
│   │       ├── extra.module.ts
│   │       └── landing.module.ts
│   ├── assets
│   ├── entry (Einstiegspunkte, welche in webpack genannt werden müssen)
│   │   ├── about.ts
│   │   ├── extra.ts
│   │   └── landing.ts
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts (Obsolet, evtl. nutzen um production zu aktivieren)
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
├── tslint.json
└── webpack.config.js
```
### Aufbau der Dateien
Der Aufbau der Dateien kann über die Struktur von *Landing* nachverfolgt werden.
`landing.ts` ist als Einstiegspunkt für Webpack allein dafür zuständig, das zugehörige Modul `landing.module.ts` einzubinden.
```typescript
// landing.ts

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {LandingModule} from "../app/modules/landing.module";

platformBrowserDynamic().bootstrapModule(LandingModule)
  .catch(err => console.log(err));
```

`landing.module.ts` ist als Modul dafür zuständig, die zu benutzenden Komponenten einzubinden.
```typescript
// landing.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { LandingComponent } from "./landing.component";

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
```
`landing.component.ts` ist eine vom Modul verwendete Komponente. Diese ist für die zugehörige Logik und Templates zuständig.
```typescript
// landing.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  
}
```
### Webpack
In `webpack.config.js`wird konfiguriert, wie die Application gebaut wird. Hier werden die gewünschten Module hinzugefügt. Die oben genannten Einstiegspunkte werden in `module.exports` unter dem Punkt `entry` hinzugefügt. So wird für jedes eigenständiges Modul ein eigenes JavaScript Bundle ausgeliefert, welches an gegebener Stelle eingebunden werden kann.
Unter dem Punkt `plugins` können die einzubindenden Module dem `vendor` CommonsChunkPlugin zugewiesen werden, damit die sich überschneidenden Dateien nicht doppelt ausgeliefert werden.
```typescript
// webpack.config.js
# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

module.exports = {
    ...
  "entry": {
    "landing": [
      "./src/entry/landing.ts"
    ],
    "extra": [
      "./src/entry/extra.ts"
    ],
    "about": [
      "./src/entry/about.ts"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ],
    "styles": [
      "./src/styles.css"
    ]
  },
    ...
    "plugins": [
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "extra",
        "landing",
        "about"
      ]
    ...
}
```
### Building
Gebaut wird das Projektaus dem `frontend` Ordner heraus mit `npm run build`.
