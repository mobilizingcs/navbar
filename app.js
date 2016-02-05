define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vent',
  'oh',
  'kc'
], function($, _, Backbone, Router, vent, oh, kc){
  var initialize = function(){
    vent.on('ohmage:error:auth', function(msg){
      console.log("error from ohmage: "+msg)
    })

    Router.initialize();
    oh.user.whoami().done(function(username){
      vent.trigger('ohmage:success:auth', username);
    });
  }
  return {
    initialize: initialize
  };
});