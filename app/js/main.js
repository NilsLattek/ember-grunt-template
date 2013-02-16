require('app/js/vendor/jquery');
require('app/js/vendor/handlebars.runtime');
require('app/js/vendor/ember');
require('app/js/vendor/ember-data');

require('tmp/templates');

window.App = Ember.Application.create();
require('app/js/adapters/adapter');
require('app/js/routers/main_router');

var adapter = App.Adapter.create();

App.store = DS.Store.create({
  adapter: adapter,
  revision: 11
});

App.router = App.Router.create();

