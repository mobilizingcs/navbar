define([
  'jquery',
  'underscore',
  'backbone',
  'collections/webtools',
  'collections/mobileapps',
  'config/ohmage'
], function($, _, Backbone, webToolsCollection, mobileAppsCollection, ohmageConfig){
  var config = ohmageConfig;
  config.footer = 'Copyright 2015 <a href="http://mobilizelabs.org>MobilizeLabs</a>';
  config.logo = 'assets/ohmage-logo-full.png'
  config.app_name = 'ohmageX'
  config.apps.findWhere({"title":"Android"}).set({"img":"assets/ohmageX-android.png","href":"https://play.google.com/store/apps/details?id=org.ohmage.x.ohmage&hl=en"})
  return config;
});