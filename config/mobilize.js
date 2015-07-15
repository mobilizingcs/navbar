define([
  'jquery',
  'underscore',
  'backbone',
  'collections/webtools',
  'collections/mobileapps',
  'config/ohmage'
], function($, _, Backbone, webToolsCollection, mobileAppsCollection, ohmageConfig){
  var config = ohmageConfig;
  config.footer = "This material is based upon work supported by the National Science Foundation under Grant Number 0962919. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation. For more information about the Mobilize grant please visit <a href='http://www.mobilizingcs.org/''>www.mobilizingcs.org</a>";
  config.logo = 'assets/mobilize-logo-full.png'
  config.app_name = 'ULCA MobilizingCS'
  config.contact = {'email': "support@mobilizingcs.org", 'voice':'(818) 527-2367'}
  config.tools.add({"title":"Class Setup",  "href": "/navbar/teacher",  "img": "assets/classsetup.png",  "description_html":"LAUSD Teacher class creation tool"})
  config.tools.add({"title":"RStudio",  "href": "https://rstudio.mobilizingcs.org", "target-blank": true,  "img": "assets/rstudio.png",  "description_html":"User-friendly interface for R"})
  config.tools.findWhere({"title":"Wiki"}).set({"href": "https://wiki.mobilizingcs.org", "img": "assets/mobilize-wiki.png",  "description_html":"All materials: curricula, how-to guides, video tutorials, etc."})
  config.apps.findWhere({"title":"Android"}).set({"img":"assets/mobilize-android.png","href":"https://play.google.com/store/apps/details?id=org.ohmage.mobilizingcs&hl=en"})
  config.apps.findWhere({"title":"iOS"}).set({"img":"assets/ohmageX-ios.jpg","href":"https://itunes.apple.com/us/app/ucla-mobilizingcs/id601202066?mt=8"})
  config.navs.add({"name":"Class Setup", "short_name":"Class", "href": "#teacher"})
  config.navs.findWhere({"name":"Data Exploration"}).set({"navs": [{"name": "Campaign Monitoring", "href": "#monitor"}, {"name": "Interactive Dashboard", "href":"#dashboard"}, {"name": "Plot App", "href":"#plotapp"}, {"name":"RStudio", "href":"https://rstudio.mobilizingcs.org"} ]})
  return config;
});