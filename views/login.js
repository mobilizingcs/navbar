define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'oh',
  'jquery.validate',
  'config/ohmage',
  'lib/text!templates/login.html',
  'lib/text!templates/message.html'
], function($, _, Backbone, vent, oh, validate, ohmage, loginTemplate, messageTemplate){
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
      vent.on("ohmage:error:new_account", this.forcePasswordChange, this);
      vent.on("updated:password", this.login, this)
      vent.on("ohmage:error", this.message, this)
    },
    events: {
      "submit #login-form": "login",
      "submit #force-reset-form": "changePassword"
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
    forcePasswordChange: function(){
      //$("#login-form").data('validator', null);
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
      $(target).html(template({status: status, msg: msg})).fadeIn(100);
    },
    undelegate: function(){
      this.undelegateEvents();
    }
  });
  return loginView;
});