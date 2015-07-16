define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vent',
  'oh'
], function($, _, Backbone, Router, vent, oh){
  var initialize = function(){
    vent.on('ohmage:error:auth', function(msg){
      console.log("error from ohmage: "+msg)
    })

    Router.initialize();
    //this.oh = oh;
    oh.user.whoami().done(function(username){
      vent.trigger('ohmage:success:auth', username);
    });
  }
  return {
    initialize: initialize
  };
});