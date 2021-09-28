## Admin Core
powered by [![starteed](https://www.starteed.com/assets/images/logos/starteed.svg)](https://www.starteed.com/)
___

## Gulp & Node.js version
For gulp version:
```sh
$ CLI version: 2.2.0
$ Local version: 4.0.2
```
___
For node.js version:
```sh
$ v12.16.1
```
___
## Installation and Build
Install node_modules: 
```sh
$ npm install 
```
For build core app in /build (for production):
```sh
$ npm run build
```
___
## Test in gulp-server
Served in http://localhost:4040
* You can edit gulp-server config in gulpfile.js (gulp task start)
```sh
$ npm run start
```
For live mode:
```sh
$ npm run live
```
___
## Configuration & deploy  
In .firebaserc set default with name hosting ( ex: staging-nameproject-admin ) 
```sh
{
  "projects": {
    "default": "staging-nameproject-admin"
  }
}
```
For deploy general:
```sh
$ firebase deploy
```
For deploy hosting:
```sh
$ firebase deploy --only hosting
```
For deploy functions:
```sh
$ firebase deploy --only functions
```
___
## File Hierarchy
* index.html (source main page)
* public/ (builded version obtained from the npm build)
* pages/ (custom dashboard.html)
* libs/ (all external libraries used in this template)
* src/ (custom core app, is the work area)
* * js/ (custom core js libraries)
* * css/ (custom CSS for AdminLTE)
* * img/ (custom resourses)
___
## Tech
* [Gulp](http://gulpjs.com/) - Automate and enhance your workflow
* [Admin LTE 2](
