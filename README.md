# Ember template for new apps using grunt

Heavily inspired by [trek](https://github.com/trek/ember-todos-with-build-tools-tests-and-other-modern-conveniences)

## Setup

Install dependencies:

    $ npm install .
    $ npm install -g grunt-cli

Start a watch task and a live reload server at [localhost:8000](http://localhost:8000/build/index.html):

    $ grunt
    $ open http://localhost:8000/build/index.html

Run unittests from the console using phantomjs (additionaly you could start the watch task and open the test/testrunner.html in the browser):

    $ grunt test

Production build:

    $ grunt build


## Upgrading ember

Replace the `ember.js` file with the debug version of ember.js. (There is a `debug` download link on [emberjs.com](http://emberjs.com))<br />
Replace the `ember.prod.js` file with the minified version of ember.js. (There is a `min + gzip` download link on [emberjs.com](http://emberjs.com))<br />
Make sure to use a handlebars version that is supported by your ember.js version.

#### Why do we use two files for ember.js?
The debug version contains some special error messages and assert-statements which are only useful during development and should not be in your production build. The ember build process removes these functions from the production build.

## Upgrading handlebars

Replace `handlebars.runtime.js` with the latest runtime(!) build of handlebars. The download link is below the normal download button on [handlebarsjs.com](http://handlebarsjs.com).<br />
There is one small change we have to apply to the handlebars runtime. Normally I don't like changing external libraries, but it is only a small change in order to make it work with grunt-neuter: <br />
Open the `handlebars.runtime.js` and at the top you should see the following line: `var Handlebars = {};` replace this with `window.Handlebars = {};`. This basically just makes the handlebars object a global variable so that ember can find it.

Now we need to upgrade the grunt module which precompiles the handlebars templates:<br />
Take a look at [grunt-ember-templates history](https://github.com/dgeb/grunt-ember-templates#release-history) and find the version number which supports the handlebars version downloaded in the previous step.<br />
In the `package.json` file update the version number of the `grunt-ember-templates` plugin.<br />
Run `npm install .` and enjoy the latest version.


TODOS:
- Try out karma
- Maybe add htmlmin