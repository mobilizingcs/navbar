define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'oh',
  'jquery.validate',
  'kc',
  'config',
  'text!templates/login.html',
  'text!templates/message.html'
], function($, _, Backbone, vent, oh, validate, kc, config, loginTemplate, messageTemplate){
  var loginView = Backbone.View.extend({
    el: $("#login"),
    initialize: function(){
      vent.trigger('snuff:recover')
      vent.trigger('snuff:register')
      oh.user.whoami().done(function(username){
        vent.trigger('ohmage:loggedin', username);
      });
      var that = this;
      oh.config.read().done(function(data){
        if (data.local_auth_enabled) {
          var template = _.template(loginTemplate);
          that.$el.html(template({registration: data.self_registration_allowed, external: data.keycloak_auth_enabled, config: config}));
          $("#login-form").validate();
          $("#username").focus();
        } else {
          that.keycloakAuth();
        }
      });

      vent.on('snuff:login', this.undelegate, this);
      vent.on("ohmage:error:new_account", this.forcePasswordChange, this);
      vent.on("updated:password", this.login, this)
      vent.on("ohmage:error", this.message, this)
      vent.on('ohmage:loggedin', this.logged_in, this);
    },
    events: {
      "submit #login-form": "login",
      "submit #force-reset-form": "changePassword",
      "click #external-auth": "keycloakAuth"
    },
    logged_in: function(){
      console.log("login: you're logged in, why did you come here?");
      vent.trigger('route', '')
    },
    login: function(e){
      e.preventDefault();
      if (!$('#login-form').valid()) {
        return false;
      }
      oh.login($("#username").val(), $("#password").val()).done(function(token){
        $.removeCookie("KEYCLOAK_TOKEN");
        $.cookie("auth_token", token);
        vent.trigger('ohmage:success:auth', $("#username").val());
        if (document.referrer.split('/')[2] != location.host || window.top.location.hash == "#login") { //redirect to home if referrer is unknown.
          console.log("Referrer appears to be a different host or undefined, ignoring.");
           window.self == window.top ? vent.trigger('route', '') : window.location.replace('/');
        } else { //back to app you came from!
          // currently ignores the referrer and instead uses the non-iframe location to send the user back there.
          // this could really use some testing..
          vent.trigger("route:navlink", window.top.location.hash)
        }
      })
    },
    forcePasswordChange: function(){
      $("#force-reset-modal").modal("show");
      $("#force-reset-username").val($("#username").val());
      $("#force-reset-current-password").val($("#password").val());
      $("#force-reset-form").validate({
        rules: {
          "force_reset_new_password": {
            required: true,
            minlength: 8
          },
          "force_reset_new_password_confirm": {
            required: true,
            minlength: 8,
            equalTo: "#force_reset_new_password"
          }
        }
      })
    },
    changePassword: function(e){
      e.preventDefault();
      var that = this;
      if (!$('#force-reset-form').valid()) {
          return false;
      }
      oh.user.change_password({
        user: $("#force-reset-username").val(),
        password: $("#force-reset-current-password").val(),
        new_password: $("#force_reset_new_password").val()
      }).done(function(){
        $("#force-reset-modal").modal('hide');
        $("#password").val($("#force_reset_new_password").val());
        $("#login-submit").trigger('click');
      });
    },
    message: function(msg, status){
      var target = ($("element").data('bs.modal') || {}).isShown ? '.errordiv.reset' : '.errordiv.login'; 
      var template = _.template(messageTemplate);
      $(target).html(template({status: status, msg: msg})).hide().fadeIn(100);
    },
    undelegate: function(){
      this.undelegateEvents();
    },
    keycloakAuth: function(e){
      if (e) {
        e.preventDefault();
      }
      if (location.hash != "#login") {
        $.cookie("redirect_to_frontend", location.hash.substring(1));
      }
      kc.login({redirectUri: location.href});
    }
  });
  return loginView;
});