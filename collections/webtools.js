define([
  'underscore',
  'backbone',
  'models/webtool'
], function(_, Backbone, webToolModel){
  var webToolCollection = Backbone.Collection.extend({
    model: webToolModel
  });
  return webToolCollection;
});