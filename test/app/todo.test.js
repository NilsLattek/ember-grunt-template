describe('Todo', function() {
  it('should create a todo', function() {
    var todo = App.Todo.createRecord();
    assert.equal(todo.get('name'), null);

    Ember.run(function(){
      todo.set('name', 'Do something');
    });

    assert.equal(todo.get('name'), 'Do something');
  });
});