# Empty Front End Project
An empty front end project complete with Stylus, Gulp and Handlebars using a BEM naming style. 

This project will build, spin up a web server and open up in the browser. As you make changes to the source files, the project will rebuild and the browser tab will automatically refresh.

Follow the instructions below to get started:

1. Fork this repo for a new project
1. Run ```npm install```
1. Run ```gulp```
1. Start your front-end work

## Styles are:
- Combined into a single file
- Minified
- Source mapped
- Cache busted per build

## Javascript files are:
- Combined into a single file
- Uglified/minified
- Source mapped
- Cache busted per build
- Code linted

## Additions and improvements:
- If you have a back-end project as well, add a gulp task to copy the assets from the build folder into the project
- Replace Stylus with your preferred pre-processor like Less or Sass
- Using bower, pull in any front-end libraries that you like to use
- Build a custom code linting reporter to add your own javascript code standards
- Cancel the build if the code linting fails (at the moment it just logs any issues to the console)
