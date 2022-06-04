define([
  'jquery',
  'underscore',
  'backbone',
  'collections/webtools',
  'collections/mobileapps',
  'collections/navs'
], function($, _, Backbone, webToolsCollection, mobileAppsCollection, navsCollection){
  var config = {};
  config.footer = 'Copyright 2015 <a href="http://ohmage.org">ohmage</a>';
  config.logo = 'assets/ohmage-logo-full.png'
  config.icon = 'assets/ohmage-icon.png'
  config.title = 'ohmage'
  config.app_name = 'ohmage/ohmageX'
  config.contact = {'email': "support@ohmage.org", 'voice':'(818) 555-5555'}
  config.tools = new webToolsCollection();
  config.tools.add({"title":"Web Frontend", "href": "/navbar/web", "noreferrer": true, "img": "assets/web.png", "description_html":"Data management and visualization"})
  config.tools.add({"title":"Survey Taking", "href": "/navbar/survey", "img": "assets/survey.png", "description_html":"Browser-based survey taking"})
  config.tools.add({"title":"Authoring Tool",  "href": "/navbar/authoring",  "img": "assets/authoring.png",  "description_html":"Interactive campaign creation"})
  //config.tools.add({"title":"Dashboard",  "href": "/navbar/dashboard",  "img": "assets/dashboard.png",  "description_html":"Interactive data exploration. Also available: <a target='_blank' href='/publicdashboard'>Public board</a>"})
  config.tools.add({"title":"Dashboard",  "href": "#campaign_mgmt/#dashboard",  "img": "assets/dashboard.png",  "description_html":"Interactive data exploration. Also available: <a target='_blank' href='/publicdashboard'>Public board</a>"})
  config.tools.add({"title":"Plot App",  "href": "/navbar/plotapp", "img": "assets/plotapp.png",  "description_html":"R-based data exploration"})
  config.tools.add({"title":"Campaign Monitor",  "href": "/navbar/monitor", "img": "assets/monitoring.png",  "description_html":"Campaign progress tracking tool"})
  config.tools.add({"title":"Help",  "href": "https://wiki.ohmage.org", "target-blank": true,  "img": "assets/ohmage-wiki.png",  "description_html":"How-to guides, video tutorials, etc."})
  config.apps = new mobileAppsCollection();
  config.apps.add({"title":"Android","img":"assets/ohmageX-android.png","href":"https://play.google.com/store/apps/details?id=org.ohmage.app"})
  config.apps.add({"title":"iOS","img":"assets/ohmageX-ios.jpg","href":"https://itunes.apple.com/us/app/ohmagex/id980069961?mt=8"})
  config.navs = new navsCollection();
  config.navs.add({"name":"Web Frontend", "short_name":"Frontend", "href":"#web", "noreferrer":true})
  config.navs.add({"name":"Survey Taking", "short_name":"Survey", "href":"#survey"})
  config.navs.add({"name":"Data Exploration", "short_name":"Data Exp", "href": "#", "dropdown": true, "navs": [{"name": "Campaign Monitoring", "href": "#monitor"}, {"name": "Interactive Dashboard", "href":"#campaign_mgmt/#dashboard"}, {"name": "Plot App", "href":"#plotapp"}]})
  config.navs.add({"name":"Documents", "short_name":"Docs", "href":"#document"})
  config.navs.add({"name":"Campaign Mgmt (beta)", "short_name":"Campaigns (beta)", "href":"#campaign_mgmt"})
  return config;
});
