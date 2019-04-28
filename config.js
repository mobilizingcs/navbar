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
  'config/ids',
  'config/idscentinela',
  'config/idslongbeach'
], function($, _, Backbone, vent, oh, oldohmageConfig, ohmageConfig, mobilizeConfig, mobilizelabsConfig, mobilizeInABoxConfig, idsConfig, idscentinelaConfig,idslongbeachConfig){
  //run on init to determine what sort of ohmage deploy this is.
  //this should really be 'application_name' param from config/read
  //but some sort of require/depends issue with require.js is happening.
  var config = {}
  switch (location.hostname) {
    case 'ids.mobilizingcs.org':
    case 'ids.gseis.ucla.edu':
    case 'ids.stat.ucla.edu':
    case 'tools.idsucla.org':
    case 'mobilize.lausd.org':
    case 'www.ids.gseis.ucla.edu':
      config = idsConfig;
      break;
    case 'ids.centinela.k12.ca.us':
    case 'centinela.mobilizingcs.org':
    case 'centinela.idsucla.org':
    case 'centinela.introdatascience.org':   
      config = idscentinelaConfig;
      break;
    case 'ids.lbusd.k12.ca.us':
	case 'ids.lbschools.net':
    case 'longbeach.mobilizingcs.org':
	case 'lb.mobilizingcs.org':
    case 'longbeach.idsucla.org': 
    case 'lb.idsucla.org':	
      config = idslongbeachConfig;
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
