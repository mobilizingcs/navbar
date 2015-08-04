define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'oh',
  'config/_oldflow_ohmage',
  'config/ohmage',
  'config/mobilize',
  'config/mobilizelabs'
], function($, _, Backbone, vent, oh, oldohmageConfig, ohmageConfig, mobilizeConfig, mobilizelabsConfig){
  //run on init to determine what sort of ohmage deploy this is.
  var config = {}
    
    //set default first, config/read response will overwrite.
    config = ohmageConfig
    oh.config.read().done(function(x){
      config = x['application_name'] == 'mobilize' ? mobilizeConfig : ohmageConfig;
    })
  return config;
});