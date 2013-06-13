require('app/js/vendor/jquery');
require('app/js/vendor/handlebars.runtime');
require('app/js/vendor/ember');

require('tmp/templates');

window.App = Ember.Application.create();
require('app/js/routers/main_router');

App.router = App.Router.create();

