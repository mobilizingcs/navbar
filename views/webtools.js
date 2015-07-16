define([
  'jquery',
  'underscore',
  'backbone',
  'collections/webtools',
  'config/2015flow',
  'lib/text!templates/webtools.html'
], function($, _, Backbone, webToolsCollection, ohmage, webToolsTemplate){
  var webToolsView = Backbone.View.extend({
    el: $("#webtools"),
    initialize: function(){
      var template = _.template( webToolsTemplate);
      this.$el.html(template({ tools: ohmage.tools.models, logo: ohmage.logo }));
    }
  });
  return webToolsView;
});