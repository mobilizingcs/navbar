define([
  'jquery',
  'underscore',
  'backbone',
  'collections/mobileapps',
  'config',
  'text!templates/mobileapps.html'
], function($, _, Backbone, mobileAppsCollection, config, mobileAppsTemplate){
  var mobileAppsView = Backbone.View.extend({
    el: $("#mobileapps"),
    initialize: function(){
      var template = _.template( mobileAppsTemplate);
      this.$el.html(template({ apps: config.apps.models, logo: config.logo, app_name: config.app_name }));
    }
  });
  return mobileAppsView;
});