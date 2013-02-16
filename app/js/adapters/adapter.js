
/* If you are using 'uuid' instead of 'id' in your json:
App.Serializer = DS.JSONSerializer.extend({
  primaryKey: function(type) {
    return "uuid";
  }
});
*/
App.Adapter = DS.RESTAdapter.extend({
  //serializer: App.Serializer
});
