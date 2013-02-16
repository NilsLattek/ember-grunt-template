require('app/js/routers/todos_router');

App.Router.map(function() {
  this.route('todos');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('todos');
  }
});