# Ember template for new apps using grunt

Heavily inspired by [trek](https://github.com/trek/ember-todos-with-build-tools-tests-and-other-modern-conveniences)

Setup:

    $ npm install .

Start a watch task and a live reload server at [localhost:8000](http://localhost:8000/build/index.html):

    $ grunt
    $ open http://localhost:8000/build/index.html

Run unittests from the console using phantomjs (additionaly you could start the watch task and open the test/testrunner.html in the browser):

    $ grunt test

Production build:

    $ grunt build



TODOS:
- Try out testacular
- Maybe add htmlmin