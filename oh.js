define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'ohmage'
], function($, _, Backbone, vent, ohmage){
  var oh = Ohmage("/app", "navbar");
  //attach global callbacks
  oh.callback("done", function(x, status, req){
  	vent.trigger("ohmage:callback", x)
  });
  
  //global error callback
  oh.callback("error", function(msg, code, req){
    if (msg.match("token") || msg.match('Authentication credentials were not provided') || msg.match("New accounts aren't allowed to use this service")) {
      vent.trigger("ohmage:error:auth", msg);
      //vent.trigger("route", "login");
    } else {
      vent.trigger("ohmage:error", msg)
    }
  });
  return oh;
});