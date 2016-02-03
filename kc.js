define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'keycloak'
], function($, _, Backbone, vent, keycloak){
  var kc = new Keycloak();
  kc.init({
   onLoad: 'check-sso',
   checkLoginIframeInterval: 1,
   responseMode: 'query' 
  }).success(function (authenticated) {
    if (authenticated) {
      $.cookie('KEYCLOAK_TOKEN', kc.token);
      vent.trigger("ohmage:keycloak:token:active");
    }
    console.log("Keycloak Authenticated? : "+authenticated);
  });

  kc.onTokenExpired = function(){
    console.log("kc token expired called");
    vent.trigger("ohmage:keycloak:token:expired");  
  };

  kc.onAuthLogout = function(){
    vent.trigger("ohmage:error:auth");
  }

  return kc;
});