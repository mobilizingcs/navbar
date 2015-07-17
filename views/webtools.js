define([
  'jquery',
  'underscore',
  'backbone',
  'collections/webtools',
  'config',
  'text!templates/webtools.html'
], function($, _, Backbone, webToolsCollection, config, webToolsTemplate){
  var webToolsView = Backbone.View.extend({
    el: $("#webtools"),
    initialize: function(){
      var template = _.template( webToolsTemplate);
      this.$el.html(template({ tools: config.tools.models, logo: config.logo }));
    }
  });
  return webToolsView;
});