define([
  'jquery',
  'underscore',
  'backbone',
  'collections/webtools',
  'collections/mobileapps',
  'config/ohmage'
], function($, _, Backbone, webToolsCollection, mobileAppsCollection, ohmageConfig){
  var config = ohmageConfig.initialize();
  config.footer = "This material is based upon work supported by the National Science Foundation under Grant Number 0962919. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation. For more information about the Mobilize grant please visit <a href='http://www.mobilizingcs.org/''>www.mobilizingcs.org</a>";
  config.logo = 'assets/mobilize-logo-full.png'
  config.icon = 'assets/mobilize-icon.png'
  config.title = 'Mobilize'
  config.app_name = 'UCLA MobilizingCS'
  config.tools.add({"title":"RStudio",  "href": "#rstudio", "img": "assets/rstudio.png",  "description_html":"User-friendly interface for R"})
  config.tools.findWhere({"title":"Wiki"}).set({"href": "#wiki", "img": "assets/mobilize-wiki.png",  "description_html":"All materials: curricula, how-to guides, video tutorials, etc."})
  config.apps.findWhere({"title":"Android"}).set({"img":"assets/ohmageX-android.png","href":"https://play.google.com/store/apps/details?id=org.ohmage.mobilizingcs&hl=en"})
  config.apps.findWhere({"title":"iOS"}).set({"img":"assets/ohmageX-ios.jpg","href":"https://itunes.apple.com/us/app/ucla-mobilizingcs/id601202066?mt=8"})
  return config;
});