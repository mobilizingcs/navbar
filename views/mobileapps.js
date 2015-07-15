define([
  'jquery',
  'underscore',
  'backbone',
  'collections/mobileapps',
  'config/ohmage',
  'lib/text!templates/mobileapps.html'
], function($, _, Backbone, mobileAppsCollection, ohmage, mobileAppsTemplate){
  var mobileAppsView = Backbone.View.extend({
    el: $("#mobileapps"),
    initialize: function(){
      var template = _.template( mobileAppsTemplate);
      this.$el.html(template({ apps: ohmage.apps.models, logo: ohmage.logo, app_name: ohmage.app_name }));
    }
  });
  return mobileAppsView;
});