define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var webToolModel = Backbone.Model.extend({
    defaults: {
      "noreferrer": true,
      "target-blank": false
    }
  });
  return webToolModel;
});