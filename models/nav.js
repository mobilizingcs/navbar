define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var navModel = Backbone.Model.extend({
    defaults: {
      "dropdown": false,
      "noreferrer": false,
      "target-blank": false
    }
  });
  return navModel;
});