define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'oh',
  'config/_oldflow_ohmage',
  'config/ohmage',
  'config/mobilize',
  'config/mobilizelabs',
  'config/mobilize-in-a-box',
  'config/ids'
], function($, _, Backbone, vent, oh, oldohmageConfig, ohmageConfig, mobilizeConfig, mobilizelabsConfig, mobilizeInABoxConfig, idsConfig){
  //run on init to determine what sort of ohmage deploy this is.
  //this should really be 'application_name' param from config/read
  //but some sort of require/depends issue with require.js is happening.
  var config = {}
  switch (location.hostname) {
    case 'ids.mobilizingcs.org':
      config = idsConfig;
      break;
    case 'lausd.mobilizingcs.org':
    case 'test.mobilizingcs.org':
      config = mobilizeConfig;
      break;
    case 'pilots.mobilizelabs.org':
      config = mobilizelabsConfig
      break;
    default:
      config = mobilizeInABoxConfig;
      break;
  }
  return config;
});