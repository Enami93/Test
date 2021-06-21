# Testia

# Introduction

Bootstrap and package your project with Angular 12 and Electron 13 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v12.0.2
- Electron v13.0.1
- Electron Builder v22.10.5

With this sample, you can:

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular 12.x CLI needs Node 11 or later to work correctly.

## Project structure

|Folder|Description|
| ---- | ---- |
| app | Electron main process folder (NodeJS) |
| src | Electron renderer process folder (Web / Angular) |

## Getting Started

*Clone this repository locally:*

``` bash
git clone https://gitlab.akka.eu/Imane.LAIDANI/akka-testia.git
```

*Install dependencies with npm (used by Electron renderer process):*

``` bash
npm install
```

## Use Electron / NodeJS libraries

3rd party libraries used in electron's main process (like an ORM) have to be added in `dependencies` of `app/package.json`.
This sample project runs in both modes (web and electron). To make this work, **you have to import your dependencies the right way**. \


## Use "web" 3rd party libraries (like angular, material, bootstrap)

3rd party libraries used in electron's renderer process (like angular) have to be added in `dependencies` of `package.json`. \
Please check `shared/services/electron.service.ts` to watch how conditional import of libraries has to be done when using NodeJS / 3rd party libraries in renderer context (i.e. Angular).


## Included Commands

|Command|Description|
| ---- | ---- |
|`npm run ng:serve`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:build`| Builds your application and creates an app consumable based on your operating system |

**Only /dist folder and NodeJS dependencies are included in the final bundle.**







