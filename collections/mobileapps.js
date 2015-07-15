define([
  'underscore',
  'backbone',
  'models/mobileapp'
], function(_, Backbone, mobileAppModel){
  var mobileAppCollection = Backbone.Collection.extend({
    model: mobileAppModel
  });
  return mobileAppCollection;
});