require('app/js/controllers/todos_controller');

App.TodosRoute = Ember.Route.extend({
  model: function() {
    return [ App.Todo.createRecord({id: '1', name: 'Do awesome stuff'}) ];
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  }
});
