define([
  'jquery',
  'underscore',
  'backbone',
  'collections/webtools',
  'collections/mobileapps',
  'collections/navs'
], function($, _, Backbone, webToolsCollection, mobileAppsCollection, navsCollection){
  var initialize = function(){
    var config = {};
    config.footer = 'Copyright 2015 <a href="http://ohmage.org">ohmage</a>';
    config.logo = 'assets/ohmage-logo-full.png'
    config.icon = 'assets/ohmage-icon.png'
    config.title = 'ohmage'
    config.app_name = 'ohmage/ohmageX'
    config.contact = {'email': "support@ohmage.org"} //can contain 'voice':'(555)555-5555'
    config.tools = new webToolsCollection();
    config.tools.add({"title":"Campaigns",  "href": "#campaigns",  "img": "assets/manager.png",  "description_html":"Manage and create campaigns"})
    config.tools.add({"title":"Survey Taking", "href": "#survey", "img": "assets/survey.png", "description_html":"Browser-based survey taking"})
    config.tools.add({"title":"Dashboard",  "href": "#campaigns/#dashboard",  "img": "assets/dashboard.png",  "description_html":"Interactive data exploration. Also available: <a target='_blank' href='#demo'>Public board</a>"})
    config.tools.add({"title":"Plot App",  "href": "#campaigns/#plotapp", "img": "assets/plotapp.png",  "description_html":"R-based data exploration"})
    config.tools.add({"title":"Monitor",  "href": "#campaigns/#monitor", "img": "assets/monitoring.png",  "description_html":"Campaign progress tracking tool"})
    config.tools.add({"title":"Documents",  "href": "#documents",  "img": "assets/document.png",  "description_html":"Manage and upload documents"})
    config.tools.add({"title":"Help",  "href": "https://wiki.ohmage.org", "target-blank": true,  "img": "assets/ohmage-wiki.png",  "description_html":"How-to guides, video tutorials, etc."})
    config.apps = new mobileAppsCollection();
    config.apps.add({"title":"Android","img":"assets/ohmageX-android.png","href":"https://play.google.com/store/apps/details?id=org.ohmage.app"})
    config.apps.add({"title":"iOS","img":"assets/ohmageX-ios.jpg","href":"https://itunes.apple.com/us/app/ohmagex/id980069961?mt=8"})
    config.navs = new navsCollection();
    config.navs.add({"name":"Campaigns", "short_name":"Campaigns", "href":"#campaigns"})
    config.navs.add({"name":"Surveys", "short_name":"Surveys", "href": "#", "dropdown": true, "navs": [{"name": "Take", "href": "#survey"}, {"name": "Manage Responses", "href":"#campaigns/#responses"}]})
    config.navs.add({"name":"Explore", "short_name":"Explore", "href": "#", "dropdown": true, "navs": [{"name": "Campaign Monitoring", "href": "#campaigns/#monitor"}, {"name": "Interactive Dashboard", "href":"#campaigns/#dashboard"}, {"name": "PlotApp", "href":"#campaigns/#plotapp"}, {"name":"Demo Data", "href":"#demo"}]})
    config.navs.add({"name":"Documents", "short_name":"Docs", "href":"#documents"})
    return config;
  }
  return {
    initialize: initialize
  };
});