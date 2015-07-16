define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'oh',
  'jquery.validate',
  'config/ohmage',
  'lib/text!templates/login.html',
  'app'
], function($, _, Backbone, vent, oh, validate, ohmage, loginTemplate, app){
  var loginView = Backbone.View.extend({
    el: $("#login"),
    initialize: function(){
      vent.trigger('snuff:recover')
      vent.trigger('snuff:register')
      var template = _.template(loginTemplate);
      this.$el.html(template({foo: 'bar'}));
      vent.on('snuff:login', this.undelegate, this);
      $("#login-form").validate();
      $("#username").focus();
    },
    events: {
      "submit form": "login"
    },
    login: function(e){
      e.preventDefault();
      if (!$('#login-form').valid()) {
        return false;
      }
      oh.login($("#username").val(), $("#password").val()).done(function(token){
        $.cookie("auth_token", token);
        vent.trigger('ohmage:success:auth', $("#username").val());
        if (document.referrer.split('/')[2] != location.host) { //redirect to home if referrer is unknown.
          console.log("Referrer appears to be a different host or undefined, ignoring.");
           window.self == window.top ? vent.trigger('route', '') : window.location.replace('/');
        } else { //back to app you came from!
          var returnTo = document.referrer.replace(/^[^:]+:\/\/[^/]+/, '').replace(/#.*/, '').replace(/\?.*/, '');
          window.location.replace(returnTo);
        }
      })
    },
    undelegate: function(){
      this.undelegateEvents();
    }
  });
  return loginView;
});