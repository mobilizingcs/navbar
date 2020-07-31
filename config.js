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
    case 'socal.idsucla.org':
    case 'daisy.idsucla.org':
    case 'daisy.mobilizingcs.org':
    case 'north.idsucla.org':
    case 'north.mobilizingcs.org':
    case 'west.idsucla.org':
    case 'west.mobilizingcs.org':
    case 'ca.idsucla.org':
    case 'ca.mobilizingcs.org':
    case 'california.idsucla.org':
    case 'california.mobilizingcs.org':
    case 'oregon.idsucla.org':
    case 'oregon.mobilizingcs.org':
    case 'idaho.idsucla.org':
    case 'idaho.mobilizingcs.org':
    case 'nj.idsucla.org':
    case 'nj.mobilizingcs.org':
    case 'nscs.idsucla.org':
    case 'pcsd.idsucla.org':
    case 'sps.idsucla.org':
    case 'slsd.idsucla.org':
    case 'frsd.idsucla.org':
    case 'msd.idsucla.org':
    case 'jcsd.idsucla.org':
    case 'bsd.idsucla.org':
    case 'mksd.idsucla.org':
    case 'hsd.idsucla.org':
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
	case 'lbusd.idsucla.org':	
	case 'lbusd.mobilizingcs.org':	
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
