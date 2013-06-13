describe('TodosView', function() {
  var todosView = null;

  beforeEach(function() {

    Ember.run(function() {
      todosView = App.TodosView.create({ templateName: 'todos' });
      var todos = [
        App.Todo.create({ id: 1, name: 'Do something' }),
        App.Todo.create({ id: 2, name: 'Do something else' })
      ];

      var controller = App.TodosController.create();
      controller.set('content', todos);

      todosView.set('controller', controller);
      todosView.append();
    });
  });

  afterEach(function() {
    Ember.run(function() {
      todosView.remove();
    });
    todosView = null;
  });

  describe('#listTodos', function() {
    it('should create a list of todos', function() {
      assert.equal($('ul.todos li').length, 2);
    });

    it('should render text from the view', function() {
      assert.include(todosView.$('.text').html(), 'Text from the view');

      Ember.run(function() {
        todosView.set('someText', 'Text changed');
      });

      assert( todosView.$('.text').html().indexOf('Text changed') !== -1 );
    });
  });
});

