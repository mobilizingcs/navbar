define([
  'underscore',
  'backbone',
  'models/nav'
], function(_, Backbone, navModel){
  var navsCollection = Backbone.Collection.extend({
    model: navModel
  });
  return navsCollection;
});