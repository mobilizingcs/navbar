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
  config.logo = 'assets/ids-height-80.png'
  config.icon = 'assets/ids-icon.png'
  config.title = 'IDS'
  config.app_name = 'UCLA MobilizingCS'
  config.contact = {'email': "support@idsucla.org"}
  config.tools.add({"title":"Class Setup",  "href": "#classes",  "img": "assets/classsetup.png",  "description_html":"Class management tool"})
  config.tools.add({"title":"RStudio",  "href": "#rstudio", "img": "assets/rstudio.png",  "description_html":"User-friendly interface for R"})
  config.tools.findWhere({"title":"Wiki"}).set({"href": "https://ids-wiki.mobilizingcs.org", "img": "assets/mobilize-wiki.png", "target-blank": true, "description_html":"All materials: curricula, how-to guides, video tutorials, etc."})
  config.apps.findWhere({"title":"Android"}).set({"img":"assets/ohmageX-android.png","href":"https://play.google.com/store/apps/details?id=org.ohmage.mobilizingcs&hl=en"})
  config.apps.findWhere({"title":"iOS"}).set({"img":"assets/ohmageX-ios.jpg","href":"https://itunes.apple.com/us/app/ucla-mobilizingcs/id601202066?mt=8"})
  config.navs.findWhere({"name":"Explore"}).set({"navs": [{"name": "Campaign Monitoring", "href": "#campaigns/#monitor"}, {"name": "Interactive Dashboard", "href":"#campaigns/#dashboard"}, {"name": "PlotApp", "href":"#campaigns/#plotapp"}, {"name":"RStudio", "href":"#rstudio"},{"name":"Demo Data", "href":"#demo"}]})
  config.navs.add({"name":"Classes", "short_name":"Classes", "href": "#classes"})
  return config;
});
